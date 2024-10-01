import { DocItentifiable_Rel, DocType } from "../DocType";

export interface SaleRightsOfUseI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  descriptionShort: string;
  descriptionLong: string;
  url: string;
  shortnote: string;

  // Userdata, Relations
  usageType: string;
  saleRightsOfUse: string;
  sales: String[];
}

export interface SaleRightsOfUseTypeI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  saleRightsOfUse: string[];
  sales: String;
}


export class SaleRightsOfUse implements SaleRightsOfUseI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "salerightsofuse";

  docScope: string = "user";

  // Userdata
  name: string = "";

  descriptionShort: string = "";

  descriptionLong: string = "";

  url: string = "";

  shortnote: string = "";

  // Userdata, Relations
  usageType: string = "";

  saleRightsOfUse: string = "";

  sales: string[] = [];
}

export class SaleRightsOfUseType implements SaleRightsOfUseTypeI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "salerightsofuseType";

  docScope: string = "system";

  // Userdata
  name: string = "";

  // Userdata, Relations
  saleRightsOfUse: string[] = [];

  sales: String = "";
}
