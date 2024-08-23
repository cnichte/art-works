/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export const VIEWTYPE_LIST = "list";
export const VIEWTYPE_VIEW = "view";
export const VIEWTYPE_FORM = "form";

export type ViewType =
  | typeof VIEWTYPE_LIST
  | typeof VIEWTYPE_VIEW
  | typeof VIEWTYPE_FORM;
