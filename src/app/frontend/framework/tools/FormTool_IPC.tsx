import { v4 as uuidv4 } from "uuid";

import { App_Messages_IPC } from "./App_Messages_IPC";
import { Header_Buttons_IPC } from "./Header_Buttons_IPC";

import { LoadData_IPC_InitAndLoadData_FUNC_Props } from "./RequestData_IPC";
import { UUIDTool } from "../../../common/framework/tools/UUIDTool";
import { IPC_Channels } from "../../../common/framework/types/system/IPC_Channels";
import { Modul_Props_I } from "../../../common/framework/types/system/Modul_Props";
import { DB_RequestData, Settings_RequestData, Action_Request } from "../../../common/framework/types/system/RequestTypes";
import { DocItentifiable_Rel } from "../../../common/types/DocType";

export interface FormTool_Save_Props<T> {
  modul_props: Modul_Props_I;
  ipcChannel: IPC_Channels;
  dataObject: any;
  valuesForm: any;
  force_save: boolean;
  request: any | DB_RequestData<T> | Settings_RequestData<T>; // is used in init_and_load_data.
}
/**
 * Form-Requests with Message-Handling.
 * List and View have their own tool.
 *
 * ! Differentiation with or without relational-pouch plugin!
 * mit  relational-pouch: {"id":"", "rev":""}
 * ohne relational-pouch: {"_id":"", "_rev":""}
 *
 * TODO: The database could indicate what is used in the result.
 * or I simply look at which props are in the result
 * 
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @see RequestData_IPC
 */
export class FormTool_IPC<T extends DocItentifiable_Rel> {
  //TODO set this up during design time

  /**
   * Request Header Buttons.
   * Request Data from Database.
   * return buaUnsubscribe_function for react
   *
   * @param props IPC_Tool_Props<T>
   * @returns buaUnsubscribe_function
   */
  public static init_and_load_data<T>(
    props: LoadData_IPC_InitAndLoadData_FUNC_Props<T>
  ): any {
    Header_Buttons_IPC.request_buttons({
      viewtype: "form",
      doctype: props.modul_props.doctype,
      doclabel: props.modul_props.doclabel,
      id: props.request.id, // is perhaps id='new'
      surpress: false,
      options: [],
    });

    if (props.request.id != "new") {
      //! Request Document from Database

      window.electronAPI
        .invoke_request(props.ipc_channel, [props.request])
        .then((result: T) => {
          props.setDataCallback(result);

          App_Messages_IPC.request_message(
            "request:message-info",
            App_Messages_IPC.get_message_from_request(
              props.request.request_type,
              props.modul_props.doclabel
            )
          );
        })
        .catch(function (error: any) {
          App_Messages_IPC.request_message(
            "request:message-error",
            error instanceof Error ? `Error: ${error.message}` : ""
          );
        });
    }

    //! Listen for Header-Button Actions.
    // Register and remove the event listener
    const buaUnsubscribe_function = window.electronAPI.listen_to(
      "ipc-button-action",
      (response: Action_Request) => {
        if (
          response.target === props.modul_props.doctype &&
          response.view == props.viewtype // should be form
        ) {
          console.log(
            `${props.modul_props.doctype}_${props.viewtype} says ACTION: `,
            response
          );
          props.doButtonActionCallback(response);
        }
      }
    );

    return buaUnsubscribe_function;
  }

  /**
   * Check, if data has changed, transport form-data to data-object, makes ipc-request,
   * transforms the result, sends the altered data-object back.
   *
   * @author Carsten Nichte
   * @param props FormTool_Props
   * @returns
   */
  public static save_data<T>(props: FormTool_Save_Props<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (
        FormTool_IPC.dataHasChanged(props.valuesForm, props.dataObject) ||
        props.force_save ||
        props.dataObject == null
      ) {
        FormTool_IPC.transport(props.valuesForm, props.dataObject);

        //* Operating modes: new and edit (needed when you have a opened form)

        //! Das Argument vom Typ "string" kann dem Parameter vom Typ "never" nicht zugewiesen werden.ts(2345)
        // deshalb muss ich oben FormTool_Props drequest als 'any' deklarieren.
        if (props.request.request_options.includes("use_relation")) {
          if (!UUIDTool.uuidValidateV4(props.dataObject.id)) {
            console.log(`NEW ID because ${props.dataObject.id}`);
            props.dataObject.id = uuidv4();
          }
        } else {
          if (!UUIDTool.uuidValidateV4(props.dataObject._id)) {
            console.log(`NEW ID because ${props.dataObject._id}`);
            props.dataObject._id = uuidv4();
          }
        }

        let request: any; // DB_RequestData<T> | Settings_RequestData<T>

        if (props.request == null) {
          request = {
            request_type: "request:save",
            doctype: props.dataObject.docType,
            request_options: [],
            data: props.dataObject,
          } as DB_RequestData<T>;
        } else {
          request = props.request;
          request.data = props.dataObject;
        }

        window.electronAPI
          .invoke_request(props.ipcChannel, [request])
          .then((result: any) => {
            // { ok: true, id: '4983cc2b-27e2-49de-aa2d-3a93f732bc80', rev: '1-96b9cb7d256fd1b29c51b84dc7d59c55'

            App_Messages_IPC.request_message(
              "request:message-success",
              JSON.stringify(result)
            );

            // update header-button-state because uuid has changed from 'new' to uuid.
            Header_Buttons_IPC.request_buttons({
              viewtype: "form",
              doctype: props.modul_props.doctype,
              doclabel: props.modul_props.doclabel,
              id: result.id, // TODO result._id oder result.id
              surpress: false,
              options: [],
            });

            console.log(result);

            resolve(FormTool_IPC.transform_result<T>(props.request, props.dataObject, result));
          })
          .catch(function (error: { message: any; }) {
            App_Messages_IPC.request_message(
              "request:message-error",
              error instanceof Error ? `Error: ${error.message}` : ""
            );
          });
      } else {
        console.log("nichts zu speichern.");
      }
    });
  }

  /**
   *
   * @param valuesForm
   * @param dataObject
   * @returns
   */
  public static dataHasChanged(valuesForm: any, dataObject: any): boolean {
    let result = false;
    if (dataObject != null) {
      for (const [key, value] of Object.entries(valuesForm)) {
        if (dataObject[key] !== valuesForm[key]) {
          console.log(`Changed value detected -  ${key} : ${value}`);
          result = true;
          break;
        }
      }
    } else {
      result = true;
    }

    return result;
  }

  /**
   * Transports the changed form data into valuesOrigin.
   *
   * @param valuesForm - Formulardaten
   * @param dataObject - Originaldaten
   */
  public static transport(valuesForm: any, dataObject: any): void {
    for (const [key] of Object.entries(valuesForm)) {
      if (dataObject[key] !== valuesForm[key]) {
        console.log("DATA IS DIFFERENT", dataObject[key]);
        console.log("        +------->", valuesForm[key]);
        dataObject[key] = valuesForm[key];
      }
    }
  }

  /**
   * Create a new dataOrigin Object and transfer rev id.
   *
   * @param result
   * @returns
   */
  public static transform_result<T>(
    request: any | DB_RequestData<T> | Settings_RequestData<T>,
    dataObject: any,
    result: { rev: string }
  ): any {
    // result = { ok: true, id: '4983cc2b-27e2-49de-aa2d-3a93f732bc80', rev: '1-96b9cb7d256fd1b29c51b84dc7d59c55'

    let o: any = {};

    for (const [key] of Object.entries(dataObject)) {
      o[key] = dataObject[key];

      //! rev must be transferred to the original data.
      if (request.request_options.includes("use_relation")) {
        o["rev"] = result.rev; 
      } else {
        o["_rev"] = result.rev;
      }
    }

    return o;
  }
}
