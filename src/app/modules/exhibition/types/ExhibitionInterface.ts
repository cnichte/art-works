export interface ExhibitionI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  date_vernissage: string;
  date_finissage: string;
  description: string;
  url: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  exhibitionType: string;
  location: string;
}
