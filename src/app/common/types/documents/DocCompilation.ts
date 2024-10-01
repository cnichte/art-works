import { DocItentifiable_Rel, DocType } from "../DocType";

export interface CompilationI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  shortnode: string;

  // Userdata, Relations
  artworks: string[];
  awards: string[];
  notes: string[];
}


export class Compilation implements CompilationI {
  // System

  id: string = ""; // _id: string = '';

  docType: DocType = "compilation";

  docScope = "user";

  // Userdata

  title: string = "";

  description: string = "";

  shortnode: string = "";

  // Userdata, Relations

  artworks: string[] = [];

  awards: string[] = [];

  notes: string[] = [];
}
