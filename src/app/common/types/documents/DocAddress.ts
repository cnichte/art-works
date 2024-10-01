import { DocItentifiable_Rel, DocType } from "../DocType";

export interface AddressI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
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


/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class Address implements AddressI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "address";

  docScope: string = "user";

  // Userdata
  name: string = "";

  birthdate: string = "";

  postalCode: string = "";

  city: string = "";

  street: string = "";

  url: string = "";

  mail: string = "";

  phone: string = "";

  shortnote: string = "";

  // Userdata, Relations
  addressType: string = "";

  sales: string[] = [];
}
