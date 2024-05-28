export interface AwardI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  year: number;
  description: string;
  url: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  compilation: string;
  publication: string;
  notes: string[];
}
