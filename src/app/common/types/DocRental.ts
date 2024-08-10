import { DocItentifiable, DocType } from "./DocType";

// https://www.nzz.ch/meinung/tribuene-stolpersteine-fuer-kunstleihgaben-ld.1303329
// Leihdauer
// Haftung
// Versicherung («von Nagel zu Nagel»)
// Transport und Kostenübernahme. 
// Vorgängiger Wert- und Zustandsbericht (von einem Gutachter erstellt?)
// Zeitraum --- 
// TODO Relationen anlegen
export interface RentalI extends DocItentifiable {
  // System
  id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  shortnote: string;

  // Userdata, Relations
  rentalType: string;
  customer: string;

  artwork: string;
  publication: string;
  edition: string;
}

export interface RentalTypeI extends DocItentifiable {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  name: string;

  // Userdata, Relations
  rentals: string[];
}


export class Rental implements RentalI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "rental";

  docScope = "user";

  // Userdata

  title: string = "";
  shortnote: string = "";

  // Userdata, Relations
  rentalType: string = "";

  customer: string = "";

  artwork: string = "";

  publication: string = "";

  edition: string = "";
}

export class RentalType implements RentalTypeI  {

  rev?: string;
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "rentalType";

  docScope: string = "user";

  // Userdata
  name: string = "";

  // Userdata, Relations
  rentals: string[];
}