// TODO use the AddressInterface for that ???
export interface ArtistI {
  // System
  id: string; // _id: string;

  docType: string;
  docScope: string;

  // Userdata
  name: string;
  alias: string;
  birthdate: string;
  image: string;

  postalCode: string;
  city: string;
  street: string;

  url: string;
  mail: string;
  phone: string;
  shortnote: string;

  // Userdata, Relations
  resumes: string[];
  artworks: string[];
}
