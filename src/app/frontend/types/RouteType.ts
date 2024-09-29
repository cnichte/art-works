/**
 * Note the path Structur: A Route starts with the `doctype`
 * Always write all three, even if you don't use them.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export const FIRSTSTART = "/firststart";

// System
export const CATALOG_ROUTE_LIST = "/catalog/list";
export const CATALOG_ROUTE_VIEW = "/catalog/view/:id";
export const CATALOG_ROUTE_FORM = "/catalog/form/:id";

export const USERS_ROUTE_LIST = "/user/list";
export const USERS_ROUTE_VIEW = "/user/view/:id";
export const USERS_ROUTE_FORM = "/user/form/:id";

// User definied
export const ADDRESS_ROUTE_LIST = "/address/list";
export const ADDRESS_ROUTE_VIEW = "/address/view/:id";
export const ADDRESS_ROUTE_FORM = "/address/form/:id";

export const ARTIST_ROUTE_LIST = "/artist/list";
export const ARTIST_ROUTE_VIEW = "/artist/view/:id";
export const ARTIST_ROUTE_FORM = "/artist/form/:id";

export const ARTWORK_ROUTE_LIST = "/artwork/list";
export const ARTWORK_ROUTE_VIEW = "/artwork/view/:id";
export const ARTWORK_ROUTE_FORM = "/artwork/form/:id";

export const AWARD_ROUTE_LIST = "/award/list";
export const AWARD_ROUTE_VIEW = "/award/view/:id";
export const AWARD_ROUTE_FORM = "/award/form/:id";

export const COMPILATION_ROUTE_LIST = "/compilation/list";
export const COMPILATION_ROUTE_VIEW = "/compilation/view/:id";
export const COMPILATION_ROUTE_FORM = "/compilation/form/:id";

export const EDITION_ROUTE_LIST = "/edition/list";
export const EDITION_ROUTE_VIEW = "/edition/view/:id";
export const EDITION_ROUTE_FORM = "/edition/form/:id";

export const EXHIBITION_ROUTE_LIST = "/exhibition/list";
export const EXHIBITION_ROUTE_VIEW = "/exhibition/view/:id";
export const EXHIBITION_ROUTE_FORM = "/exhibition/form/:id";

export const FIRSTSTART_ROUTE_LIST = "/firststart/list";

export const GENRE_ROUTE_LIST = "/genre/list";
export const GENRE_ROUTE_VIEW = "/genre/view/:id";
export const GENRE_ROUTE_FORM = "/genre/form/:id";

export const GROUPOFWORK_ROUTE_LIST = "/groupofwork/list";
export const GROUPOFWORK_ROUTE_VIEW = "/groupofwork/view/:id";
export const GROUPOFWORK_ROUTE_FORM = "/groupofwork/form/:id";

export const NOTE_ROUTE_LIST = "/note/list";
export const NOTE_ROUTE_VIEW = "/note/view/:id";
export const NOTE_ROUTE_FORM = "/note/form/:id";

export const PUBLICATION_ROUTE_LIST = "/publication/list";
export const PUBLICATION_ROUTE_VIEW = "/publication/view/:id";
export const PUBLICATION_ROUTE_FORM = "/publication/form/:id";

export const RENTAL_ROUTE_LIST = "/rental/list";
export const RENTAL_ROUTE_VIEW = "/rental/view/:id";
export const RENTAL_ROUTE_FORM = "/rental/form/:id";

export const CALCULATION_ROUTE_LIST = "/calculation/list";
export const CALCULATION_ROUTE_VIEW = "/calculation/view/:id";
export const CALCULATION_ROUTE_FORM = "/calculation/form/:id";

export const SALE_ROUTE_LIST = "/sale/list";
export const SALE_ROUTE_VIEW = "/sale/view/:id";
export const SALE_ROUTE_FORM = "/sale/form/:id";

export const SALERIGHTSOFUSE_ROUTE_LIST = "/salerightsofuse/list";
export const SALERIGHTSOFUSE_ROUTE_VIEW = "/salerightsofuse/view/:id";
export const SALERIGHTSOFUSE_ROUTE_FORM = "/salerightsofuse/form/:id";

export const STATISTIC_ROUTE_LIST = "/statistic/list";
export const STATISTIC_ROUTE_VIEW = "/statistic/view/:id";
export const STATISTIC_ROUTE_FORM = "/statistic/form/:id";

export const TAG_ROUTE_LIST = "/tag/list";
export const TAG_ROUTE_VIEW = "/tag/view/:id";
export const TAG_ROUTE_FORM = "/tag/form/:id";

export const WHITEBORD_ROUTE_LIST = "/whiteboard/list";
export const WHITEBORD_ROUTE_VIEW = "/whiteboard/view/:id";
export const WHITEBORD_ROUTE_FORM = "/whiteboard/form/:id";

export type RouteType =
  // System
  | typeof CATALOG_ROUTE_LIST
  | typeof CATALOG_ROUTE_VIEW
  | typeof CATALOG_ROUTE_FORM
  | typeof USERS_ROUTE_LIST
  | typeof USERS_ROUTE_VIEW
  | typeof USERS_ROUTE_FORM
  // User defined
  | typeof ADDRESS_ROUTE_LIST
  | typeof ADDRESS_ROUTE_VIEW
  | typeof ADDRESS_ROUTE_FORM
  | typeof ARTIST_ROUTE_LIST
  | typeof ARTIST_ROUTE_VIEW
  | typeof ARTIST_ROUTE_FORM
  | typeof ARTWORK_ROUTE_LIST
  | typeof ARTWORK_ROUTE_VIEW
  | typeof ARTWORK_ROUTE_FORM
  | typeof AWARD_ROUTE_LIST
  | typeof AWARD_ROUTE_VIEW
  | typeof AWARD_ROUTE_FORM
  | typeof COMPILATION_ROUTE_LIST
  | typeof COMPILATION_ROUTE_VIEW
  | typeof COMPILATION_ROUTE_FORM
  | typeof EDITION_ROUTE_LIST
  | typeof EDITION_ROUTE_VIEW
  | typeof EDITION_ROUTE_FORM
  | typeof EXHIBITION_ROUTE_LIST
  | typeof EXHIBITION_ROUTE_VIEW
  | typeof EXHIBITION_ROUTE_FORM
  | typeof FIRSTSTART_ROUTE_LIST
  | typeof GENRE_ROUTE_LIST
  | typeof GENRE_ROUTE_VIEW
  | typeof GENRE_ROUTE_FORM
  | typeof GROUPOFWORK_ROUTE_LIST
  | typeof GROUPOFWORK_ROUTE_VIEW
  | typeof GROUPOFWORK_ROUTE_FORM
  | typeof NOTE_ROUTE_LIST
  | typeof NOTE_ROUTE_VIEW
  | typeof NOTE_ROUTE_FORM
  | typeof PUBLICATION_ROUTE_LIST
  | typeof PUBLICATION_ROUTE_VIEW
  | typeof PUBLICATION_ROUTE_FORM
  | typeof RENTAL_ROUTE_LIST
  | typeof RENTAL_ROUTE_VIEW
  | typeof RENTAL_ROUTE_FORM
  | typeof CALCULATION_ROUTE_LIST
  | typeof CALCULATION_ROUTE_VIEW
  | typeof CALCULATION_ROUTE_FORM
  | typeof SALE_ROUTE_LIST
  | typeof SALE_ROUTE_VIEW
  | typeof SALE_ROUTE_FORM
  | typeof SALERIGHTSOFUSE_ROUTE_LIST
  | typeof SALERIGHTSOFUSE_ROUTE_VIEW
  | typeof SALERIGHTSOFUSE_ROUTE_FORM
  | typeof STATISTIC_ROUTE_LIST
  | typeof STATISTIC_ROUTE_VIEW
  | typeof STATISTIC_ROUTE_FORM
  | typeof TAG_ROUTE_LIST
  | typeof TAG_ROUTE_VIEW
  | typeof TAG_ROUTE_FORM
  | typeof WHITEBORD_ROUTE_LIST
  | typeof WHITEBORD_ROUTE_VIEW
  | typeof WHITEBORD_ROUTE_FORM;
