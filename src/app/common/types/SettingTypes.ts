export type DbOptionsType = "local" | "remote";

export type DbOptions_Setting = {
  type: DbOptionsType;
  label: string;
  template: string;
};
