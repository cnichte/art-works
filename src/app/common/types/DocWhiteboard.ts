import { DocItentifiable, DocType } from "./DocType";

export interface WhiteboardI extends DocItentifiable {
  // System
  id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  content: string;
  preview: string;

  // Userdata, Relations
}
export class DocWhiteboard implements WhiteboardI {
  // System
  id: string = ''; // _id: string = '';

  docType: DocType = 'whiteboard';

  docScope = 'user';

  // Userdata
  name: string = '';
  content: string = '';
  preview: string = '';
}
