export interface GenreI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
}
