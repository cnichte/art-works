export interface TagI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;
  color: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  notes: string[];
  parent: string;
  children: string[];
}
