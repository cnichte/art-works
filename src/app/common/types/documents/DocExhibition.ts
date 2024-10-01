import { DocItentifiable_Rel, DocType } from "../DocType";

export interface ExhibitionI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  date_vernissage: string;
  date_finissage: string;
  description: string;
  url: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  exhibitionType: string;
  location: string;
}

export interface ExhibitionTypeI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  exhibitions: string[];
}

export class ExhibitionType implements ExhibitionTypeI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "exhibitionType";

  docScope = "system";

  // Userdata
  name: string = "";

  // Userdata, Relations
  exhibitions: string[] = [];
}

export class Exhibition implements ExhibitionI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "exhibition";

  docScope = "user";

  // Userdata
  title: string = "";

  date_vernissage: string = "";

  date_finissage: string = "";

  description: string = "";

  url: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];

  exhibitionType: string = "";

  location: string = "";
}
