export const IPC_DATABASE = "ipc-database" ;
export const IPC_SETTINGS = "ipc-settings";
export const IPC_BUTTON_ACTION = "ipc-button-action";
export const IPC_MESSAGE = "ipc-message";
export const IPC_EXTERNAL_LINK = "ipc-external-link";

export type IPC_Channels =
  | typeof IPC_DATABASE
  | typeof IPC_SETTINGS
  | typeof IPC_BUTTON_ACTION
  | typeof IPC_MESSAGE
  | typeof IPC_EXTERNAL_LINK;