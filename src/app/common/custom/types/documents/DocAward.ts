import { DocItentifiable_Rel, DocType } from "../../../../common/types/DocType";


export interface AwardI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  year: number;
  description: string;
  url: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  compilation: string;
  publication: string;
  notes: string[];
}


export class Award implements AwardI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "award";

  docScope = "user";

  // Userdata
  title: string = "";

  year: number = 2023;

  description: string = "";

  url: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];

  compilation: string = "";

  publication: string = "";

  notes: string[] = [];
}
