export interface CompilationI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  title: string;
  description: string;
  shortnode: string;

  // Userdata, Relations
  artworks: string[];
  awards: string[];
  notes: string[];
}
