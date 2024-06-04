import { Tagging_Props } from '../../../common/frontend/types/Tagging_Types';
import { MyDateValue } from '../../../common/frontend/DateTool';
import { AttachmentMeta } from '../../../common/frontend/types/AttachmentTypes';

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
