import { DocItentifiable, DocType } from "./DocType";

export interface NoteI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  content: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  tags: string[];
  // todo: Notizen können an so ziemlich alles angehängt werden.
}


export class Note implements NoteI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "note";

  docScope = "user";

  // Userdata
  title: string = "";

  content: string = "";

  shortnote: string = "";

  // Userdata, Relations
  artworks: string[] = [];

  tags: string[] = [];
}
