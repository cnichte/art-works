export interface CalculationGroupI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  calculations: string[];
}
