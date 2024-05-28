export interface RentalI {
  // System
  id: string;
  docType: string;
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
