import { MyDateValue } from '../../../common/frontend/DateTool';

// https://pouchdb.com/guides/attachments.html
export interface ArtworkI {
  // System
  id: string; // _id: string;
  docType: string;
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

  image_print: string;
  image_small: string;
  image_type: string;

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
}
