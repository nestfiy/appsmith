import React from "react";
import Breadcrumbs from "components/ads/Breadcrumbs";
import { BreadcrumbCategories } from "@appsmith/pages/AdminSettings/SettingsBreadcrumbs";

export const getBreadcrumbList = (category: string, subCategory?: string) => {
  const breadcrumbList = [
    BreadcrumbCategories.HOMEPAGE,
    ...(category !== "general" ? [BreadcrumbCategories.DEFAULT_SETTINGS] : []),
    ...(subCategory
      ? [BreadcrumbCategories[category], BreadcrumbCategories[subCategory]]
      : [BreadcrumbCategories[category]]),
  ];

  return breadcrumbList;
};

function SettingsBreadcrumbs({
  category,
  subCategory,
}: {
  category: string;
  subCategory?: string;
}) {
  return <Breadcrumbs items={getBreadcrumbList(category, subCategory)} />;
}

export default SettingsBreadcrumbs;