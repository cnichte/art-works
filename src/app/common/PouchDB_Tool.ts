import { PouchDB_Mode } from "./types/PouchDB_Mode";
//* PouchDB without Plugin relational-pouch
//* PouchDB with    Plugin relational-pouch

/**
 * id and rev properties differ depending on mode.
 **This is a sketch to try out.
 */
export class PouchDB_Tool {

  // The desired mode is set here at design time.
  public static MODE: PouchDB_Mode = "relational";

  public static get_ID_PropertyName(): string {
    switch (PouchDB_Tool.MODE) {
      case "standard":
        return "_id";
      case "relational":
        return "id";
    }
  }

  public static get_REV_PropertyName(): string {
    switch (PouchDB_Tool.MODE) {
      case "standard":
        return "_rev";
      case "relational":
        return "rev";
    }
  }
}
