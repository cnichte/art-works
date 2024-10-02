import { DocItentifiable_Rel, DocType } from "../../../types/DocType";

export interface AddressTypeI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  addresses: string[];
}

/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class AddressType implements AddressTypeI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "addressType";

  docScope: string = "system";

  // Userdata
  name: string = "";

  // Userdata, Relations
  addresses: string[] = [];
}
