export interface SaleTypeI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  sales: string[];
}
