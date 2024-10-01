import { DocType } from "../DocType";
import { SegmentType } from "../SegmentType";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export interface Modul_Props_I {
  doclabel: string;
  doctype: DocType;
  segment: SegmentType; //? muss 'any' sein, weil als Index in Array verwendet.
}
