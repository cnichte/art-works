import { DocItentifiable, DocType } from "./DocType";

export interface GenreI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
}

export class Genre implements GenreI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "genre";

  docScope = "system";

  // Userdata
  name: string = "";

  description: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];
}