# output variables is a way to organize data to be easily queried and
# to show them back to the Terraform user.
#
# As a user of Terraform, you may be interested in a few important values,
# e.g. a load balancer IP, VPN address, etc.
#
# Outputs are a way to tell Terraform what data is important.
# This data is outputted when "terraform apply" is called,
# and can be queried using the "terraform output" command.

# Modules encapsulate their resources. A resource in one module cannot directly
# depend on resources or attributes in other modules, unless those are exported
# through outputs. These outputs can be referenced in other places in your
# configuration, for example: "${module.mysql-db.instance_address}"

output backend_instance_guide {
  value = "Please open http://${module.backend-vm.instance_address} in your web browser and select Project Social Network (Backend).\nNote that it may take 1-2 minutes before you can access it.\nAfter the installation finishes, log into the instance using:\ngcloud compute --project ${module.backend-vm.project} ssh --zone ${module.backend-vm.zone} clouduser@${module.backend-vm.instance_name}\n"
}

output frontend_instance_guide {
  value = "Please open http://${module.frontend-vm.instance_address} in your web browser and select Project Social Network (Frontend).\nNote that it may take 1-2 minutes before you can access it.\nAfter the installation finishes, log into the instance using:\ngcloud compute --project ${module.frontend-vm.project} ssh --zone ${module.frontend-vm.zone} clouduser@${module.frontend-vm.instance_name}\n"
}

output mongodb_instance_guide {
  value = "Please open http://${module.mongodb-vm.instance_address} in your web browser and select Project Social Network (MongoDB).\nNote that it may take 1-2 minutes before you can access it.\nAfter the installation finishes, log into the instance using:\ngcloud compute --project ${module.mongodb-vm.project} ssh --zone ${module.mongodb-vm.zone} clouduser@${module.mongodb-vm.instance_name}\n"
}

output mysql_db_guide {
  value = "Logging on to the MySQL works in the same way as accessing a local MySQL database except that you need to specify the host.\nmysql -h${module.mysql-db.instance_address} -u${module.mysql-db.username} -p${module.mysql-db.generated_user_password}\n"
}

output bigtable_guide {
  value = "To connect to the BigTable instance with Java:\nConnection connection = BigtableConfiguration.connect(\"${var.project}\", \"${module.bigtable.instance_id}\")\nTo use the HBase shell:\nmvn clean package exec:java -Dbigtable.projectID=${var.project} -Dbigtable.instanceID=${module.bigtable.instance_id}\nTo use the data import tool:\nmvn clean package -Dbigtable.projectID=${var.project} -Dbigtable.instanceID=${module.bigtable.instance_id}\n"
}

output dataproc_cluster_name {
  value = "${module.dataproc.dataproc_cluster_name}\n"
}
