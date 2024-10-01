import { DocItentifiable_Rel, DocType } from "../DocType";

export interface SaleI extends DocItentifiable_Rel {
  // System
  id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  editionNumber: number;

  calculatedPrice: number;
  paid: number;
  shortnote: string;

  // Userdata, Relations
  saleType: string;
  saleRightsOfUse: string;
  customer: string;

  artwork: string;
  publication: string;
  edition: string;

}

export interface SaleTypeI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  sales: string[];
}


export class Sale implements SaleI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "sale";

  docScope = "user";

  // Userdata
  editionNumber: number = 0;

  calculatedPrice: number = 0;

  paid: number = 0;

  shortnote: string = "";

  // Userdata, Relations
  saleType: string = "";

  saleRightsOfUse: string = "";

  customer: string = "";

  artwork: string = "";

  publication: string = "";

  edition: string = "";
}

export class SaleType implements SaleTypeI {
  // System
  id: string = "";
  docType: DocType = "saleType";
  docScope: string = "user";

  // Userdata
  name: string = "";

  // Userdata, Relations
  sales: string[] = [];  
}
