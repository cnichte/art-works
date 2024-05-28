/* eslint-disable import/no-cycle */
/* eslint-disable no-unused-vars */

/**
 *  todo: static member ist nicht möglich
 *  https://stackoverflow.com/questions/13955157/how-to-define-static-property-in-typescript-interface
 *  https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de
 *
 * @export
 * @interface JSONableI
 */
export interface JSONableI {
  toJson(): any;
  // static loadTo(db: Database): void;
}
