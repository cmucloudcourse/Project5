# output variables is a way to organize data to be easily queried and
# shown back to the Terraform user.
#
# As a user of Terraform, you may be interested in values of importance,
# e.g. a load balancer IP, VPN address, etc.
#
# Outputs are a way to tell Terraform what data is important.
# This data is outputted when "terraform apply" is called,
# and can be queried using the "terraform output" command.

# Modules encapsulate their resources. A resource in one module cannot directly
# depend on resources or attributes in other modules, unless those are exported
# through outputs. These outputs can be referenced in other places in your
# configuration, for example: "${module.mysql-db.instance_address}"

output instance_name {
  description = "The name of the database instance"
  value       = "${google_sql_database_instance.master.name}"
}

output instance_address {
  description = "The IPv4 address of the master database instance"
  value       = "${google_sql_database_instance.master.ip_address.0.ip_address}"
}

output instance_address_time_to_retire {
  description = "The time when the master instance IP address will be retired. RFC 3339 format."
  value       = "${google_sql_database_instance.master.ip_address.0.time_to_retire}"
}

output self_link {
  description = "Self link to the master instance"
  value       = "${google_sql_database_instance.master.self_link}"
}

output username {
  description = "The name of the default user"
  value       = "${var.user_name}"
}

output generated_user_password {
  description = "The auto generated default user password if no input password was provided"
  value       = "${random_id.user-password.hex}"
  sensitive   = true
}
