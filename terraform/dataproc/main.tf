# The Cloud Storage staging bucket used by the hadoop cluster to stage files,
# such as Hadoop jars, between client machines and the cluster.
resource "google_storage_bucket" "hadoop-cluster-staging-bucket" {
  name          = "${var.dataproc_cluster_bucket}"
  project       = "${var.project}"
  force_destroy = true
}

# You can Cloud Dataproc cluster to run Hadoop jobs that
# read and write data to and from Cloud Bigtable.
resource "google_dataproc_cluster" "hadoop-cluster" {
  name    = "hadoop-cluster"
  project = "${var.project}"
  region  = "${var.region}"

  cluster_config {
    staging_bucket = "${google_storage_bucket.hadoop-cluster-staging-bucket.name}"

    master_config {
      num_instances = 1
      machine_type  = "n1-standard-2"

      disk_config {
        boot_disk_size_gb = 10
      }
    }

    worker_config {
      num_instances = 2
      machine_type  = "n1-standard-2"

      disk_config {
        boot_disk_size_gb = 10
        num_local_ssds    = 1
      }
    }
  }
}
