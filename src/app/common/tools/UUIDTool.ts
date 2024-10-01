import {
  version as uuidVersion,
  validate as uuidValidate,
  v4 as uuidv4,
} from "uuid";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export class UUIDTool {
  /**
   * Checks a string to see if it is a valid uuid.
   *
   * @param theString Der zu prüfende String.
   * @returns true, wenn valide., false wenn nicht.
   */
  public static uuidValidateV4(theString: string): boolean {
    return uuidValidate(theString) && uuidVersion(theString) === 4;
  }
}
