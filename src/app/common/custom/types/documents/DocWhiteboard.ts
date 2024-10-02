import { DocItentifiable_Rel, DocType } from "../../../../common/types/DocType";

export interface WhiteboardI extends DocItentifiable_Rel {
  // System
  id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  description:string;
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
  description:string = '';
  content: string = '';
  preview: string = '';
}
