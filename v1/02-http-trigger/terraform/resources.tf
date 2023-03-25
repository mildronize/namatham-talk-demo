locals {
  location = "southeastasia"
  resource_group_name = "rg-nammatham-demo"
  storage_account_name = "nammathamdemo"
  app_service_plan_name = "asp-nammatham-demo"
  function_app_name = "nammatham-demo"
  log_name = "log-nammatham-demo"
}

resource "azurerm_resource_group" "main" {
  name     = local.resource_group_name
  location = local.location
}


resource "azurerm_storage_account" "main" {
  name                             = local.storage_account_name
  resource_group_name              = azurerm_resource_group.main.name
  location                         = azurerm_resource_group.main.location
  account_tier                     = "Standard"
  account_kind                     = "Storage"
  account_replication_type         = "LRS"
  cross_tenant_replication_enabled = false
}

resource "azurerm_service_plan" "main" {
  name                = local.app_service_plan_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location
  os_type             = "Linux"
  sku_name            = "Y1"
}

resource "azurerm_linux_function_app" "main" {
  name                = local.function_app_name
  resource_group_name = azurerm_resource_group.main.name
  location            = azurerm_resource_group.main.location

  storage_account_name       = azurerm_storage_account.main.name
  storage_account_access_key = azurerm_storage_account.main.primary_access_key
  service_plan_id            = azurerm_service_plan.main.id

  builtin_logging_enabled = false
  client_certificate_mode = "Required"
  https_only              = true

  site_config {
    application_insights_key               = azurerm_application_insights.main.instrumentation_key
    application_insights_connection_string = azurerm_application_insights.main.connection_string
    ftps_state                             = "FtpsOnly"
    application_stack {
      node_version = "18"
    }
    cors {
      allowed_origins = [
        "https://portal.azure.com",
      ]
      support_credentials = false
    }
  }

}

resource "azurerm_application_insights" "main" {
  name                = local.function_app_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sampling_percentage = 0
  application_type    = "web"
  workspace_id        = azurerm_log_analytics_workspace.main.id
}

resource "azurerm_log_analytics_workspace" "main" {
  name                = local.log_name
  location            = azurerm_resource_group.main.location
  resource_group_name = azurerm_resource_group.main.name
  sku                 = "PerGB2018"
  retention_in_days   = 30
}

