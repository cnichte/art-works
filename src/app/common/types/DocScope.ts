export const DOCSCOPE_SYSTEM = "system";
export const DOCSCOPE_USER = "user";

export type DocScope =
  | typeof DOCSCOPE_SYSTEM
  | typeof DOCSCOPE_USER