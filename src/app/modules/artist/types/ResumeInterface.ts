export interface ResumeI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  what: string;
  where: string;
  from: string;
  to: string;
  shortnote: string;

  // Userdata, Relations
  resumeType: string;
  artist: string;
}
