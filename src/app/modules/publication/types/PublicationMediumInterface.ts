interface PublicationMediumItemI {
  id: string;
  name: string;
  description: string;
}

interface PublicationMediumI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;
  description: string;
  children: PublicationMediumItemI[];

  // Userdata, Relations
  publications: string[];
}

export { PublicationMediumI, PublicationMediumItemI };
