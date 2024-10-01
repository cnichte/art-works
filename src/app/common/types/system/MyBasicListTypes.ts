export interface MyBasicList_Meta_I {
    dataIndex: string; // required for Table
    mapKeyTo?: string | MyRelationResolver_I;
  }

  export interface MyRelationResolver_I {
    dataIndex: string,
    showFields: Array<string>,
  }