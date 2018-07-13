resource "google_compute_instance" "student_instance" {
  name = "${var.name}"

  machine_type = "n1-standard-1"
  zone         = "us-east1-b"
  project      = "${var.project}"

  boot_disk {
    initialize_params {
      image = "${var.image}"
      size  = "${var.disk_size}"
    }
  }

  network_interface {
    network = "default"

    access_config {
      # Ephemeral IP, leaving this block empty will generate a new external IP and assign it to the machine
    }
  }

  labels = {
    # Only hyphens (-), underscores (_), lowercase characters, and numbers are allowed.
    # Keys must start with a lowercase character. International characters are allowed.
    project = "5"
  }
}
