# Terraform Insruction

```
terraform init
terraform plan -out=tfplan -no-color  > tfplan.txt        
terraform apply "tfplan"
terraform plan -out=tfplan -no-color -destroy > tfplan.txt
```