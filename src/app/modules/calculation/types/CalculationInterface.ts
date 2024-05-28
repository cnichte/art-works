// import { CalculationItemI } from "./CalculationItemInterface";

export interface CalculationI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  calculationgroup: string;
  calculationitems: string[];

  notes: string[];
}
