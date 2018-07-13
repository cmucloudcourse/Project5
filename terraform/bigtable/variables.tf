# Variables of a child module
# Do not create `terraform.tfvars` within child modules.
# Instead, create `terraform.tfvars` at the root module.
variable project {}

variable region {}
variable zone {}
variable name {}
variable bigtable_cluster_id {}

variable num_nodes {
  default = 3
}
