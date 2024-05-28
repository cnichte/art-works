export interface GroupOfWorkI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  zeitraum_von: string;
  zeitraum_bis: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
}
