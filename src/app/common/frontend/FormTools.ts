/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
import { message } from 'antd';
import { AttachmentAction } from './types/AttachmentTypes';
import { FormPropertiesInterface } from './types/FormPropertiesInterface';
import { RequestsFormI } from '../backend/types/RequestsFactoryTypes';

import { IPC_Channels } from "../types/IPC_Channels";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 */
export default class FormTools {
  /**
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param moduleId
   * @param id
   * @returns
   */
  public static getGotoViewPath(moduleId: string, id: string): string {
    if (id === 'new') {
      return `/${moduleId}/list/`;
    }
    return `/${moduleId}/view/${id}`;
  }

  /*
  static async invokeRequestHandler() {
    const result = await window.my_app_api.ipc.invoke('my-invokable-ipc', "arg1", "arg2")
    // ...
  }
*/
  /**
   * Request, der vom Standard abweicht: 'request:saletypes-custom'.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param channel
   * @param request
   * @param module
   * @param options
   */
  public static customRequest(
    channel: IPC_Channels,
    request: string,
    module: string,
    options: any
  ) {
    console.log(`------> form customRequest: ${request}`);
    window.my_app_api.ipc.sendMessage(channel, [
      request,
      module,
      options,
    ]);
  }

  public static customResponse(
    channel: string,
    request: string,
    setData: (data: any) => void
  ) {
    //! ipcRenderer.on oder ipcRenderer.once
    // For forms, several requests are made (from the used ReactComponents) to the backend
    // For example: artworkForm uses also myTag...
    // That's why I use 'on' here and have to choose from the different
    // answers and have to choose the one that suits me.
    // If I only expect one answer, I can use once.
    window.my_app_api.ipc.on(channel as IPC_Channels, (arg:any) => {
      if (arg.request === request) {
        // eslint-disable-next-line prettier/prettier
        console.log(`<------ form customResponse, for Request: ${request}, received arg.data=`, arg.data);
        setData(arg.data);
      }
    });
  }

  /**
   * Request to the database: Load the data of the id.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param requests
   * @param id
   */
  public static loadDataRequest(requests: RequestsFormI, id: string) {
    // eslint-disable-next-line prettier/prettier
    console.log(`------> form requestHandler: ${requests.loadData}, Request-ID: ${id}`);

    //* Operating mode is 'new' or 'edit'.
    if (id !== 'new') {
      //* The parameter is a uuid, so we query the data from the database.
      window.my_app_api.ipc.sendMessage(requests.channel, [
        requests.loadData,
        id,
      ]);
    } else {
      //* The parameter is 'new', so I create a new data object, and create a uuid.
      window.my_app_api.ipc.sendMessage(requests.channel, [
        requests.getObject,
      ]);
    }
  }

  /**
   * Pick up response and evaluate.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param dataOrigin
   * @param props
   * @param callback - This should add the data to the form.
   */
  public static loadDataResponse(
    dataOrigin: any,
    props: FormPropertiesInterface,
    callback: Function
  ): any {
    //! ipcRenderer.on oder ipcRenderer.once
    // For forms, several requests are made (from the used ReactComponents) to the backend
    // For example: artworkForm uses also myTag...
    // That's why I use 'on' here and have to choose from the different
    // answers and have to choose the one that suits me.
    // If I only expect one answer, I can use once.
    window.my_app_api.ipc.on(props.requests.channel, (arg:any) => {
      if (
        arg.request === props.requests.loadData ||
        arg.request === props.requests.getObject
      ) {
        console.log('<------ form responseLoadHandler, received data arg=', arg);
        // eslint-disable-next-line prettier/prettier
        console.log('        form responseHandler (1): transport received data to form...');
        //* Transport data into the form
        // Here we get either the data for the uuid, or
        // an empty data object created with the objectFactory in the database
        // data object in the database.
        callback(arg.data);
      } else {
        // console.log('   +--- form responseHandler: (3) ignored response !!!');
      }
    });
  }

  /**
   * Submit form.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param id
   * @param dataOrigin
   * @param valuesForm
   * @param attachmentActions
   * @param props
   */
  public static saveDataRequest(
    id: string,
    dataOrigin: any,
    valuesForm: any,
    attachmentActions: AttachmentAction[],
    props: FormPropertiesInterface
  ) {
    if (FormTools.dataHasChanged(valuesForm, dataOrigin[props.segment][0])) {
      FormTools.transport(valuesForm, dataOrigin[props.segment][0]);

      //* Operating modes: new and edit.
      if (id !== 'new') {
        console.info(`submitHandler requests 'data save' from backend...`);
        window.my_app_api.ipc.sendMessage(props.requests.channel, [
          props.requests.saveData,
          dataOrigin[props.segment][0],
          { attachmentActions },
        ]);
      } else {
        console.info(`Request 'data create' from backend...`);
        // TODO: Ich könnte im Backend auch prüfen ob der Datensatz schon vorhanden ist
        // und dann entweder save oder create ausführen.
        // Dann könnte ich mir die zwei unterschiedlichen Anfrage sparen.
        // oder ich führe generell ein zusätzliches Parameter-Objekt ein
        // (mit mode=create oder save). Später kommen sicher noch mehr dazu.
        // TODO Das Ergebnis abholen...
        window.my_app_api.ipc.sendMessage(props.requests.channel, [
          props.requests.createData,
          dataOrigin[props.segment][0],
          { attachmentActions },
        ]);
      }
    } else {
      console.log('nichts zu speichern.');
    }
  }

  /**
   * Antwort abholen und auswerten.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param dataOrigin
   * @param props
   * @param callback - This should add the data to the form.
   */
  public static saveDataResponse(
    dataOrigin: any,
    props: FormPropertiesInterface,
    callback: Function
  ): any {
    //! ipcRenderer.on oder ipcRenderer.once
    // For forms, several requests are made (from the used ReactComponents) to the backend
    // For example: artworkForm uses also myTag...
    // That's why I use 'on' here and have to choose from the different
    // answers and have to choose the one that suits me.
    // If I only expect one answer, I can use once.
    window.my_app_api.ipc.on(props.requests.channel, (arg:any) => {
      if (
        arg.request === props.requests.saveData ||
        arg.request === props.requests.createData
      ) {
        console.log('<------ form submitHandler, received data arg=', arg);
        // eslint-disable-next-line prettier/prettier
          console.log('        form submitHandler (2): process save/create result...');
        //* Evaluate response from backend
        if (arg != null && typeof arg === 'object') {
          if ('error' in arg) {
            // TODO Fehlermeldung ausgeben
            message.error(JSON.stringify(arg.error));
          } else {
            message.success('Daten erfolgreich gespeichert.');
          // } else if (dataOrigin[props.segment][0].id !== arg.data.id) {
            // message.success('Daten erfolgreich gespeichert.');
          // message.warning('Die zurückgegebene ID ist aber nicht identisch!');
          }
        }

        callback(arg);
      } else {
        // console.log('   +--- form responseHandler: (3) ignored response !!!');
      }
    });
  }

  /**
   * Checks form data for changes.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param valuesForm - Formulardaten
   * @param valuesOrigin - Originaldaten
   * @returns
   */
  public static dataHasChanged(valuesForm: any, valuesOrigin: any): boolean {
    let result = false;
    for (const [key, value] of Object.entries(valuesForm)) {
      if (valuesOrigin[key] !== valuesForm[key]) {
        console.log(`Changed value detected -  ${key} : ${value}`);
        result = true;
        break;
      }
    }

    return result;
  }

  /**
   * Transports the changed form data into valuesOrigin.
   *
   * @param valuesForm - Formulardaten
   * @param valuesOrigin - Originaldaten
   */
  public static transport(valuesForm: any, valuesOrigin: any) {
    for (const [key] of Object.entries(valuesForm)) {
      if (valuesOrigin[key] !== valuesForm[key]) {
        console.log('DATA IS DIFFERENT', valuesOrigin[key]);
        console.log('        +------->', valuesForm[key]);
        valuesOrigin[key] = valuesForm[key];
      }
    }
  }
}
