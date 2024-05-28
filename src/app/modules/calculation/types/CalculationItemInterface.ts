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
