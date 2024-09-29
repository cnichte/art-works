//* system
// This is a special internal
// it addresses the frameworks header-buttons
export const DOCTYPE_HEADER_BUTTONS = "headerbuttons";
export type ActionTarget = typeof DOCTYPE_HEADER_BUTTONS;
export const DOCTYPE_CATALOG = "catalog";
export const DOCTYPE_USER = "user";

export const TYPE_USERRIGHT_SUPERADMIN = "superadmin";
export const TYPE_USERRIGHT_ADMIN = "admin";
export const TYPE_USERRIGHT_READ_ONLY = "read-only";
export const TYPE_USERRIGHT_READ_WRITE = "read-write";
export const TYPE_USERRIGHT_NONE = "none";

export type DocUserRights =
  | typeof TYPE_USERRIGHT_ADMIN
  | typeof TYPE_USERRIGHT_READ_ONLY
  | typeof TYPE_USERRIGHT_READ_WRITE
  | typeof TYPE_USERRIGHT_NONE;

//* custom types

export const DOCTYPE_ADDRESS = "address";
export const DOCTYPE_ADDRESS_TYPE = "addressType";

export const DOCTYPE_ARTIST = "artist";
export const DOCTYPE_ARTWORK = "artwork";
export const DOCTYPE_AWARD = "award";
export const DOCTYPE_CALCULATION = "calculation";
export const DOCTYPE_CALCULATION_GROUP = "calculationgroup";

export const DOCTYPE_COMPILATION = "compilation";
export const DOCTYPE_EDITION = "edition";
export const DOCTYPE_EDITION_TYPE = "editionType";
export const DOCTYPE_EXHIBITION = "exhibition";
export const DOCTYPE_EXHIBITION_TYPE = "exhibitionType";

export const DOCTYPE_FIRSTSTART = "firststart";

export const DOCTYPE_GENRE = "genre";
export const DOCTYPE_GROUPOFWORK = "groupofwork";
export const DOCTYPE_NOTE = "note";
export const DOCTYPE_PUBLICATION = "publication";
export const DOCTYPE_PUBLICATION_TYPE = "publicationType";
export const DOCTYPE_PUBLICATION_WHAT = "publicationWhat";
export const DOCTYPE_PUBLICATION_MEDIUM = "publicationMedium";
export const DOCTYPE_RENTAL = "rental";
export const DOCTYPE_RENTAL_TYPE = "rentalType";
export const DOCTYPE_RESUME = "resume";
export const DOCTYPE_RESUME_TYPE = "resumeType";
export const DOCTYPE_SALE = "sale";
export const DOCTYPE_SALE_TYPE = "saleType";
export const DOCTYPE_SALE_RIGHTSOFUSE = "salerightsofuse";
export const DOCTYPE_SALE_RIGHTSOFUSE_TYPE = "salerightsofuseType";
export const DOCTYPE_SETTINGS = "settings";
export const DOCTYPE_STATISTIC = "statistic";

export const DOCTYPE_TAG = "tag";
export const DOCTYPE_WHITEBOARD = "whiteboard";


export type DocType =
  // system
  | typeof DOCTYPE_CATALOG
  | typeof DOCTYPE_USER
  // custom
  | typeof DOCTYPE_ADDRESS
  | typeof DOCTYPE_ADDRESS_TYPE
  | typeof DOCTYPE_ARTIST
  | typeof DOCTYPE_ARTWORK
  | typeof DOCTYPE_AWARD
  | typeof DOCTYPE_CALCULATION
  | typeof DOCTYPE_CALCULATION_GROUP
  | typeof DOCTYPE_COMPILATION
  | typeof DOCTYPE_EDITION
  | typeof DOCTYPE_EDITION_TYPE
  | typeof DOCTYPE_EXHIBITION
  | typeof DOCTYPE_EXHIBITION_TYPE
  | typeof DOCTYPE_FIRSTSTART
  | typeof DOCTYPE_GENRE
  | typeof DOCTYPE_GROUPOFWORK
  | typeof DOCTYPE_NOTE
  | typeof DOCTYPE_PUBLICATION
  | typeof DOCTYPE_PUBLICATION_TYPE
  | typeof DOCTYPE_PUBLICATION_WHAT
  | typeof DOCTYPE_PUBLICATION_MEDIUM
  | typeof DOCTYPE_RENTAL
  | typeof DOCTYPE_RENTAL_TYPE
  | typeof DOCTYPE_RESUME
  | typeof DOCTYPE_RESUME_TYPE
  | typeof DOCTYPE_SALE
  | typeof DOCTYPE_SALE_TYPE
  | typeof DOCTYPE_SALE_RIGHTSOFUSE
  | typeof DOCTYPE_SALE_RIGHTSOFUSE_TYPE

  | typeof DOCTYPE_SETTINGS
  | typeof DOCTYPE_STATISTIC

  | typeof DOCTYPE_TAG
  | typeof DOCTYPE_WHITEBOARD;


// DocItentifiable Interface To constrain my generics
// https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints

// TODO Varianten PouchDB with and without Plugin relational-pouch 
//* PouchDB without Plugin relational-pouch
/*
export interface DocItentifiable {
  _id: string;
  _rev?: string;
  docType: DocType;
}
*/

//* PouchDB with Plugin relational-pouch
export interface DocItentifiable {
  id: string;
  rev?: string;
  docType: DocType;
}