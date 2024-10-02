import { DocItentifiable_Rel, DocType } from "../../../../common/types/DocType";

export interface GenreI extends DocItentifiable_Rel {
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
