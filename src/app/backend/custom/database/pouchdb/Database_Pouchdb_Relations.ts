/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export const pouchdb_relations: Array<any> = [
  {
    singular: "address",
    plural: "addresses",
    relations: {
      addressType: { belongsTo: "addressType" },
      sales: { hasMany: "sale" },
    },
  },
  {
    singular: "addressType",
    plural: "addressTypes",
  },
  {
    singular: "artist",
    plural: "artists",
    relations: {
      resumes: { hasMany: "resume" },
      artworks: { hasMany: "artwork" },
    },
  },
  {
    singular: "artwork",
    plural: "artworks",
    relations: {
      artists: { hasMany: "artist" },
      groupsofwork: { hasMany: "groupofwork" },
      compliations: { hasMany: "compilation" },
      publications: { hasMany: "publication" },
      editions: { hasMany: "edition" },
      sales: { hasMany: "sale" },
      exhibitions: { hasMany: "exhibitions" },
      awards: { hasMany: "award" },
      genres: { hasMany: "genre" },
      tags: { hasMany: "tag" },
      notes: { hasMany: "note" },
    },
  },
  {
    singular: "award",
    plural: "awards",
    relations: {
      artwork: { hasMany: "artwork" },
      compilation: { belongsTo: "compilation" },
      publication: { belongsTo: "publication" },
      notes: { hasMany: "note" },
    },
  },
  {
    singular: "calculation",
    plural: "calculations",
    relations: {
      calculationgroup: { belongsTo: "calculationgroup" },
      calculationitems: { hasMany: "calculationitem" },
      notes: { hasMany: "note" },
    },
  },
  {
    singular: "calculationgroup",
    plural: "calculationgroups",
    relations: {
      calculations: { hasMany: "calculation" },
    },
  },
  {
    singular: "calculationitem",
    plural: "calculationitems",
    relations: {
      calculations: { hasMany: "calculation" },
    },
  },
  {
    singular: "compilation",
    plural: "compilations",
    relations: {
      artworks: { hasMany: "artwork" },
      awards: { hasMany: "award" },
      notes: { hasMany: "note" },
    },
  },
  {
    singular: "edition",
    plural: "editions",
    relations: {
      editionType: { belongsTo: "editionType" },
      artworks: { hasMany: "artwork" },
      sales: { hasMany: "sale" },
    },
  },
  {
    singular: "editionType",
    plural: "editionTypes",
    relations: {
      editions: { hasMany: "edition" },
    },
  },
  {
    singular: "exhibition",
    plural: "exhibitions",
    relations: {
      artworks: { hasMany: "artwork" },
      exhibitionType: { belongsTo: "exhibitionType" },
    },
  },
  {
    singular: "exhibitionType",
    plural: "exhibitionTypes",
    relations: {
      exhibitions: { hasMany: "exhibition" },
    },
  },
  {
    singular: "genre",
    plural: "genres",
    relations: {
      artworks: { hasMany: "artwork" },
    },
  },
  {
    singular: "groupofwork",
    plural: "groupsofwork",
    relations: {
      artworks: { hasMany: "artwork" },
    },
  },
  {
    singular: "note",
    plural: "notes",
    relations: {
      artworks: { hasMany: "artwork" },
      tags: { hasMany: "tag" },
    },
  },
  {
    singular: "publication",
    plural: "publications",
    relations: {
      publicationType: { belongsTo: "publicationType" },
      publicationWhat: { belongsTo: "publicationWhat" },
      publicationMedium: { belongsTo: "publicationMedium" },
      artworks: { hasMany: "artwork" },
      sales: { hasMany: "sale" },
    },
  },
  {
    singular: "publicationType",
    plural: "publicationTypes",
    relations: {
      publications: { hasMany: "publication" },
    },
  },
  {
    singular: "publicationWhat",
    plural: "publicationWhats",
    relations: {
      publications: { hasMany: "publication" },
    },
  },
  {
    singular: "publicationMedium",
    plural: "publicationMediums",
    relations: {
      publications: { hasMany: "publication" },
    },
  },
  {
    singular: "resume",
    plural: "resumes",
    relations: {
      resumeType: { belongsTo: "resumeType" },
      artist: { belongsTo: "artist" },
    },
  },
  {
    singular: "resumeType",
    plural: "resumeTypes",
    relations: {
      resumes: { hasMany: "resume" },
    },
  },
  {
    singular: "sale",
    plural: "sales",
    relations: {
      saleType: { belongsTo: "saleType" },
      customer: { belongsTo: "address" },
      artwork: { belongsTo: "artwork" },
      edition: { belongsTo: "edition" },
      SaleRightsOfUse: { belongsTo: "salerightsofuse" },
    },
  },
  {
    singular: "saleType",
    plural: "saleTypes",
    relations: {
      sales: { hasMany: "sale" },
    },
  },
  {
    singular: "salerightsofuse",
    plural: "salerightsofuses",
    relations: {
      saleRightsOfUseType: { belongsTo: "salerightsofuseType" },
      sales: { hasMany: "sale" },
    },
  },
  {
    singular: "salerightsofuseType",
    plural: "salerightsofuseType",
    relations: {
      saleRightsOfUses: { hasMany: "salerightsofuse" },
    },
  },
  {
    singular: "tag",
    plural: "tags",
    relations: {
      parent: { belongsTo: "tag" },
      childs: { hasMany: "tag" },
      artworks: { hasMany: "artwork" },
      notes: { hasMany: "note" },
    },
  },
  {
    singular: "whiteboard",
    plural: "whiteboards",
  },
];
