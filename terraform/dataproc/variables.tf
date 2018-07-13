# Variables of a child module
# Do not create `terraform.tfvars` within child modules.
# Instead, create `terraform.tfvars` at the root module.
variable project {}

variable region {}
variable dataproc_cluster_bucket {}
