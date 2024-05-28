import { IPC_Channels } from "../../types/IPC_Channels";

type ListOperation = 'list' | 'delete';
type ViewOperation = 'view';
type FormOperation = 'form' | 'form-save' | 'form-get-object' | 'form-create';

interface RequestsListI {
  channel: IPC_Channels;

  listData: string;
  deleteData: string;
}

interface RequestViewI {
  channel: IPC_Channels;
  viewData: string;
}

interface RequestsFormI {
  channel: IPC_Channels;

  loadData: string;
  saveData: string;
  getObject: string;
  createData: string;
}

export {
  RequestsListI,
  RequestViewI,
  RequestsFormI,
  type ListOperation,
  type ViewOperation,
  type FormOperation,
};
