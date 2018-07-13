output instance_name {
  description = "The name of the vm instance"
  value       = "${google_compute_instance.student_instance.name}"
}

output instance_address {
  description = "The IPv4 address of the vm instance"
  value       = "${google_compute_instance.student_instance.network_interface.0.access_config.0.assigned_nat_ip}"
}

output zone {
  value = "${google_compute_instance.student_instance.zone}"
}

output project {
  value = "${google_compute_instance.student_instance.project}"
}
