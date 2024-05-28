interface PublicationWhatItemI {
  id: string;
  name: string;
  description: string;
}

interface PublicationWhatI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  // Userdata
  name: string;
  description: string;
  children: PublicationWhatItemI[];

  // Userdata, Relations
  publications: string[];
}

export { PublicationWhatI, PublicationWhatItemI };
