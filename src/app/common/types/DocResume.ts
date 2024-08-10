import { DocItentifiable, DocType } from "./DocType";

export interface ResumeI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  what: string;
  where: string;
  from: string;
  to: string;
  shortnote: string;

  // Userdata, Relations
  resumeType: string;
  artist: string;
}

export interface ResumeTypeI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  resumes: string[];
}

export class Resume implements ResumeI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "resume";

  docScope: string = "user";

  // Userdata
  title: string = "";

  what: string = "";

  where: string = "";

  from: string = "";

  to: string = "";

  shortnote: string = "";

  // Userdata, Relations
  resumeType: string = "";

  artist: string = "";
}

export class ResumeType implements ResumeTypeI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "resumeType";

  docScope: string = "user";

  // Userdata
  name: string = "";

  // Userdata, Relations
  resumes: string[] = [];
}