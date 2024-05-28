export interface SaleRightsOfUseI {
  // System
  id: string; // _id: string;
  docType: string;
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
