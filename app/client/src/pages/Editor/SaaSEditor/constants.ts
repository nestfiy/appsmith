import { BUILDER_PAGE_URL, BUILDER_URL } from "constants/routes";

export const SAAS_BASE_PATH = `${BUILDER_URL}/saas`;
export const SAAS_EDITOR_PATH = `${SAAS_BASE_PATH}/:pluginPackageName`;
export const SAAS_EDITOR_DATASOURCE_ID_PATH = `${SAAS_EDITOR_PATH}/datasources/:datasourceId`;
export const SAAS_EDITOR_API_ID_PATH = `${SAAS_EDITOR_PATH}/api/:apiId`;

export const SAAS_BASE_URL = (
  defaultApplicationId = ":defaultApplicationId",
  pageId = ":pageId",
) => BUILDER_PAGE_URL({ defaultApplicationId, pageId, suffix: "saas" });

export const SAAS_EDITOR_URL = (
  defaultApplicationId = ":defaultApplicationId",
  pageId = ":pageId",
  pluginPackageName = ":pluginPackageName",
): string => {
  return BUILDER_PAGE_URL({
    defaultApplicationId,
    pageId,
    suffix: `saas/${pluginPackageName}`,
  });
};

export const SAAS_EDITOR_DATASOURCE_ID_URL = (
  defaultApplicationId = ":defaultApplicationId",
  pageId = ":pageId",
  pluginPackageName = ":pluginPackageName",
  datasourceId = ":datasourceId",
  params = {},
): string =>
  BUILDER_PAGE_URL({
    defaultApplicationId,
    pageId,
    suffix: `saas/${pluginPackageName}/datasources/${datasourceId}`,
    params,
  });

export const SAAS_EDITOR_API_ID_URL = (
  defaultApplicationId = ":defaultApplicationId",
  pageId = ":pageId",
  pluginPackageName = ":pluginPackageName",
  apiId = ":apiId",
  params = {},
): string =>
  BUILDER_PAGE_URL({
    defaultApplicationId,
    pageId,
    suffix: `saas/${pluginPackageName}/api/${apiId}`,
    params,
  });

export const APPSMITH_TOKEN_STORAGE_KEY = "APPSMITH_AUTH_TOKEN";
