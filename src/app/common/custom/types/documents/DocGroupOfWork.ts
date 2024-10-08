import { DocItentifiable_Rel, DocType } from "../../../../common/types/DocType";

export interface GroupOfWorkI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  zeitraum_von: string;
  zeitraum_bis: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
}


export class GroupOfWork implements GroupOfWorkI {
  // System

  id: string = ""; // _id: string = '';

  docType: DocType = "groupofwork";

  docScope = "user";

  // Userdata

  title: string = "";

  description: string = "";

  zeitraum_von: string = "";

  zeitraum_bis: string = "";

  shortnote: string = "";

  // Userdata, Relations

  artworks: string[] = [];
}
