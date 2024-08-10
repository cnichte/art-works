import { Tagging_Props } from "./Tagging_Types";
import { AttachmentMeta } from "./AttachmentTypes";
import { MyDateValue } from "../../frontend/DateTool";
import { DocItentifiable, DocType } from "./DocType";

export interface ArtworkI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  title_addition: string;
  topic: string;
  description_long: string;
  description_short: string;

  dateCreation: MyDateValue;

  implementation: string;
  tool: string;
  forsale: boolean;
  price: string;
  shortnote: string;

  attachmentsMeta:AttachmentMeta[];

  // Userdata, Relations
  artists: string[];
  groupsofwork: string[];
  compliations: string[];
  collections: string[];
  publications: string[];
  editions: string[];
  sales: string[];
  exhibitions: string[];
  awards: string[];
  genres: string[];
  tags: string[];
  notes: string[];
  labels: Tagging_Props
}


/**
 * /src/app/backend/Werk.ts
 * Das das Template um Werk-Dokumente zu verarbeiten.
 */
export class Artwork implements ArtworkI {
  // System

  id: string = ""; // _id: string = '';

  docType: DocType = "artwork";

  docScope = "user";

  // Userdata

  title: string = "";

  title_addition: string = "";

  topic: string = "";

  description_long: string = "";

  description_short: string = "";

  dateCreationType: string = "date";

  dateCreationFormat: string = "YYYY";

  dateCreation: MyDateValue = {
    dateMode: "dateMoment",
    dateType: "year",
    dateFormat: "YYYY",
    date: ["2023"],
  };

  implementation: string = "";

  tool: string = "";

  forsale: boolean = false;

  price: string = "";

  shortnote: string = "";

  // Userdata, Images
  attachmentsMeta: AttachmentMeta[] = [];

  // extra Tagging
  labels: Tagging_Props = {
    rating: 0,
    color: "",
    flag: false,
  };

  // Userdata, Relations

  artists: string[] = [];

  groupsofwork: string[] = [];

  compliations: string[] = [];

  collections: string[] = [];

  publications: string[] = [];

  editions: string[] = [];

  sales: string[] = [];

  exhibitions: string[] = [];

  awards: string[] = [];

  genres: string[] = [];

  tags: string[] = [];

  notes: string[] = [];
}
