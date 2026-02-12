import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { customerType } from "./customerType";
import { orderType } from "./orderType";
import { productType } from "./productType";
import siteSettings from "./siteSettings";
import branch from "./branch";
import feedback from "./feedback";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    categoryType,
    customerType,
    productType,
    orderType,
    siteSettings,
    branch,
    feedback,
  ],
};
