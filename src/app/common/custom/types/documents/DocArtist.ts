import { DocItentifiable_Rel, DocType } from "../../../types/DocType";

// TODO use the AddressInterface for that ???
export interface ArtistI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;

  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  alias: string;
  birthdate: string;
  image: string;

  postalCode: string;
  city: string;
  street: string;

  url: string;
  mail: string;
  phone: string;
  shortnote: string;

  // Userdata, Relations
  resumes: string[];
  artworks: string[];
}

export class Artist implements ArtistI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "artist";

  docScope: string = "user";

  // Userdata
  name: string = "";

  alias: string = "";

  image: string = "";

  birthdate: string = "";

  postalCode: string = "";

  city: string = "";

  street: string = "";

  url: string = "";

  mail: string = "";

  phone: string = "";

  shortnote: string = "";

  // Userdata, Relations

  resumes: string[] = [];

  artworks: string[] = [];
}
