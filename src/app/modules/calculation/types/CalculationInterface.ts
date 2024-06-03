// import { CalculationItemI } from "./CalculationItemInterface";

import { CalcPosI } from "./CalcPosInterface";

export interface CalculationI {
  // System
  id: string; // _id: string;
  docType: string;
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
