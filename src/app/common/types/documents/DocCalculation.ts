import { DocItentifiable_Rel, DocType } from "../DocType";

// Das sind die inline-Kalkulationen
export interface CalcPosI {
  // Userdata
  id: string;
  title: string;
  value: string;
  shortnote: string;
}

export interface CalculationGroupI {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  calculations: string[];
}

export interface CalculationI extends DocItentifiable_Rel {
  // System
  id: string; // _id: string;
  docType: DocType;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  shortnote: string;
  calc: CalcPosI[];
  // Userdata, Relations
  calculationgroup: string;
  calculationitems: string[];

  notes: string[];
}

export interface CalculationItemI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  value: number;
  shortnote: string;
  
  // Userdata, Relations
  calculations: string[];
}

export class Calculation implements CalculationI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "calculation";

  docScope = "user";

  // Userdata
  title: string = "";

  description: string = "";

  shortnote: string = "";

  // Userdata, Relations
  calculationgroup: string = "";

  calculationitems: string[] = [];

  calc: CalcPosI[];

  notes: string[] = [];
}

export class CalculationGroup implements CalculationGroupI {
  // System
  id: string = ""; // _id: string = '';

  docType: DocType = "calculationgroup";

  docScope = "user";

  // Userdata
  title: string = "";

  description: string = "";

  shortnote: string = "";

  // Userdata, Relations
  calculations: string[] = [];
}

export class CalculationItem implements CalculationItemI {
  // System
  id: string = ""; // _id: string = '';

  docType: string = "calculationitem";

  docScope = "user";

  // Userdata
  title: string = "";

  value: number = 0;

  shortnote: string = "";

  // Userdata, Relations
  calculations: string[] = [];
}

