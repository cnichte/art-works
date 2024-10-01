import { DocItentifiable_Rel, DocType } from "../DocType";
import { DbOptionsType } from "../SettingTypes";

export interface DocCatalogType extends DocItentifiable_Rel {
  id: string;
  docType: DocType;
  templateName: string;
  templateDescription: string;
  dbOption: DbOptionsType;
  protocoll: string;
  dbHost: string;
  dbPort: string;
  dbName: string;
  dbUser: string;
  dbPassword: string;
  dbTemplate: string;
}

export class DocCatalog implements DocCatalogType {
  id: string = "";
  docType: DocType = "catalog";

  templateName: string = "";
  templateDescription: string = "";
  dbOption: DbOptionsType = "local";
  protocoll: string = "http://";
  dbHost: string = "";
  dbPort: string = "";
  dbName: string = "";
  dbUser: string = "";
  dbPassword: string = "";
  dbTemplate: string = "";
}
