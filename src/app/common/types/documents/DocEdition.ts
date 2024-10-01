import { DocItentifiable_Rel, DocType } from "../DocType";

export interface EditionI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;
  description: string;
  edition: number;
  artistsPrint: number;
  prices: EditionPriceI[];
  shortnote: string;

  // Userdata, Relations
  editionType: string;
  artworks: string[];
  sales: string[];
  notes: string[];
}

export interface EditionTypeI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  editions: string[];
}

// Das sind die inline-Preise
export interface EditionPriceI {
  // Userdata
  id: string;
  name: string;
  numberStart: number;
  numberEnd: number;
  price: number;
  sales: string[];
}

export class EditionType implements EditionTypeI
{
  // System
  id: string = ''; // _id: string = '';

  docType: DocType = 'editionType';

  docScope: string = 'system';

  // Userdata
  name: string = '';

  // Userdata, Relations

  editions: string[] = [];
}


export class EditionPrice implements EditionPriceI {
  id: string = '';

  // Userdata
  name: string = '';

  numberStart: number = 0;

  numberEnd: number = 0;

  price: number = 0;

  sales: string[] = [];
}


export class Edition implements EditionI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "edition";

  docScope = "user";

  // Userdata
  name: string = "";

  description: string = "";

  edition: number = 0;

  artistsPrint: number = 0;

  prices: EditionPriceI[] = [];

  shortnote: string = "";

  // Userdata, Relations
  editionType: string = "";

  artworks: string[] = [];

  sales: string[] = [];

  notes: string[] = [];
}
