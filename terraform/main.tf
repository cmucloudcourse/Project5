# Usage:
# Install and initialize Google Cloud SDK
# Create a file named `terraform.tfvars`
# and set the values of the variables defined in `variables.tf`:
# project = "gcp-social-network-123456"
#
# Windows doesn't show file extensions by default.
# On Windows, make sure the file extension of the terraform.tfvars is correct,
# e.g. not "terraform.tfvars.txt".
#
# DO NOT create `terraform.tfvars` within child modules (e.g. under ./vm).
# Instead, create `terraform.tfvars` at the root module.
#
# terraform init      Initialize a Terraform working directory
# terraform validate  Validates the Terraform files
# terraform fmt       Rewrites config files to canonical format
# terraform plan      Generate and show an execution plan
# terraform apply     Builds or changes infrastructure
# terraform destroy   Destroy Terraform-managed infrastructure
# terraform state list  List resources
#
# We recommend that you read the provided templates to learn. Meanwhile, it is
# not mandatory and not graded.

provider google {
  region = "${var.region}"
}

resource "random_id" "name" {
  byte_length = 2
}

resource "google_compute_image" "student-image" {
  name    = "${var.google_compute_image_name}"
  project = "${var.project}"

  raw_disk {
    source = "${var.google_compute_image_source}"
  }
}

# GCP firewall rules are applied at the virtual networking level
resource "google_compute_firewall" "default" {
  name    = "cloud-computing-project-image-firewall"
  network = "default"
  project = "${var.project}"

  allow {
    protocol = "tcp"

    # "22" SSH
    # "80" HTTP
    # "3000" frontend
    # "8080" bacnkend
    # "27017" mongoDB
    # "8088", "8042" Hadoop
    ports = ["22", "80", "3000", "8080", "8088", "8042", "27017"]
  }
}

# In modules we only specify a name rather than a name and a type as we do for resources.
# This name is used elsewhere in the configuration to reference the module and its outputs.
module "backend-vm" {
  # The arguments used in a module block, correspond to variables within the module itself.
  # You can therefore discover all the available variables for a module by inspecting the source of it.
  source = "./vm"

  # the vm name
  name = "backend-vm"

  # pass the variables from the root module to the child module
  project                     = "${var.project}"
  google_compute_image_name   = "${var.google_compute_image_name}"
  google_compute_image_source = "${var.google_compute_image_source}"
  image                       = "${google_compute_image.student-image.self_link}"
}

module "frontend-vm" {
  source                      = "./vm"
  name                        = "frontend-vm"
  project                     = "${var.project}"
  google_compute_image_name   = "${var.google_compute_image_name}"
  google_compute_image_source = "${var.google_compute_image_source}"
  image                       = "${google_compute_image.student-image.self_link}"
}

module "mongodb-vm" {
  source                      = "./vm"
  name                        = "mongodb-vm"
  project                     = "${var.project}"
  google_compute_image_name   = "${var.google_compute_image_name}"
  google_compute_image_source = "${var.google_compute_image_source}"
  image                       = "${google_compute_image.student-image.self_link}"
  disk_size                   = 30
}

module "mysql-db" {
  source = "./cloud-sql"

  # name the SQL instance as p32-mysql-random_hex_id
  name             = "p32-mysql-${random_id.name.hex}"
  database_version = "MYSQL_5_7"
  project          = "${var.project}"

  location_preference = [{
    zone = "${var.zone}"
  }]
}

module "bigtable" {
  source = "./bigtable"

  project             = "${var.project}"
  zone                = "${var.zone}"
  region              = "${var.region}"
  name                = "bigtable-instance"
  bigtable_cluster_id = "bigtable-instance-cluster"
}

module "dataproc" {
  source                  = "./dataproc"
  project                 = "${var.project}"
  region                  = "${var.region}"
  dataproc_cluster_bucket = "p32-dataproc-staging-bucket-${random_id.name.hex}"
}
