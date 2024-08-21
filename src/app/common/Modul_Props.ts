import { DocType } from "./types/DocType";

export interface Modul_Props_I {
  doclabel: string;
  doctype: DocType;
  segment: string; //? muss 'any' sein, weil als Index in Array verwendet.
}
