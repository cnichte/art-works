export interface PublicationTypeI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  publications: string[];
}
