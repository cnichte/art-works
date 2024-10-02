import { DocItentifiable_Rel, DocType } from "../../../../common/types/DocType";

export interface TagI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  color: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  notes: string[];
  parent: string;
  children: string[];
}


export class Tag implements TagI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "tag";

  docScope = "user";

  // Userdata
  name: string = "";

  color: string = "";

  shortnote: string = "";

  // Userdata, Relations
  // TODO: Tags können noch an alles angehängt werden...
  artworks: string[] = [];

  notes: string[] = [];

  parent: string = "";

  children: string[] = [];
}
