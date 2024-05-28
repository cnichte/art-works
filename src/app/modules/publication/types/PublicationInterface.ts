export interface PublicationI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  isbn: string;
  publisher: string;
  nationallibrary: string;
  url: string;
  description: string;
  shortnote: string;

  // Userdata, Relations
  publicationType: string;
  publicationWhat: string;
  publicationMedium: string;

  artworks: string[];
  awards: string[];
  sales: string[];
}
