# Creates a Google Bigtable instance
resource "google_bigtable_instance" "instance" {
  name         = "${var.name}"
  cluster_id   = "${var.bigtable_cluster_id}"
  zone         = "${var.zone}"
  project      = "${var.project}"
  num_nodes    = "${var.num_nodes}"
  storage_type = "HDD"
}
