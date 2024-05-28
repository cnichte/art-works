export interface AddressI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;
  birthdate: string;

  postalCode: string;
  city: string;
  street: string;

  url: string;
  mail: string;
  phone: string;
  shortnote: string;

  // Userdata, Relations
  addressType: string;
  sales: string[];
}
