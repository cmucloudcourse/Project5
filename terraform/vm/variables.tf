# Variables of a child module
# Do not create `terraform.tfvars` within child modules.
# Instead, create `terraform.tfvars` at the root module.
variable name {}

variable project {}

variable image {}

variable google_compute_image_name {}

variable google_compute_image_source {}

variable disk_size {
  default = 10
}
