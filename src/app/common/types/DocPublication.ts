import { DocItentifiable, DocType } from "./DocType";

export interface PublicationI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  isbn: string;
  publisher: string;
  nationallibrary: string;
  url: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  publicationType: string;
  publicationWhat: string;
  publicationMedium: string;

  artworks: string[];
  awards: string[];
  sales: string[];
}

export interface PublicationMediumItemI {
  id: string;
  name: string;
  description: string;
}

export interface PublicationMediumI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;
  description: string;
  children: PublicationMediumItemI[];

  // Userdata, Relations
  publications: string[];
}

export interface PublicationTypeI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  publications: string[];
}

export interface PublicationWhatItemI {
  id: string;
  name: string;
  description: string;
}

export interface PublicationWhatI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  // Userdata
  name: string;
  description: string;
  children: PublicationWhatItemI[];

  // Userdata, Relations
  publications: string[];
}


export class Publication implements PublicationI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "publication";

  docScope = "user";

  // Userdata
  title: string = "";

  isbn: string = "";

  publisher: string = "";

  nationallibrary: string = "";

  url: string = "";

  description: string = "";

  shortnote: string = "";

  // Userdata, Relations
  publicationType: string = "";

  publicationWhat: string = "";

  publicationMedium: string = "";

  artworks: string[] = [];

  awards: string[] = [];

  sales: string[] = [];
}

export class PublicationMedium implements PublicationMediumI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "publicationMedium";

  docScope = "system";

  // Userdata
  name: string = "";

  description: string = "";

  children: PublicationMediumItemI[] = [];

  // Userdata, Relations
  publications: string[] = [];
}


export class PublicationType implements PublicationTypeI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "publicationType";

  docScope = "system";

  // Userdata
  name: string = "";

  // Userdata, Relations
  publications: string[] = [];
}

export class PublicationWhat implements PublicationWhatI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "publicationWhat";

  docScope = "system";

  // Userdata
  name: string = "";

  description: string = "";

  children: PublicationWhatItemI[] = [];

  // Userdata, Relations
  publications: string[] = [];
}

