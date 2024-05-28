export interface SaleRightsOfUseTypeI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  saleRightsOfUse: string[];
  sales: String;
}
