export interface NoteI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  content: string;
  shortnote: string;

  // Userdata, Relations
  artworks: string[];
  tags: string[];
  // todo: Notizen können an so ziemlich alles angehängt werden.
}
