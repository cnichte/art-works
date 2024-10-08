import { IPC_BUTTON_ACTION } from "../../../common/framework/types/system/IPC_Channels";
import { Action_Request_Props_I, Action_Request } from "../../../common/framework/types/system/RequestTypes";
import { DOCTYPE_HEADER_BUTTONS } from "../../../common/types/DocType";

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export class Header_Buttons_IPC {
  /**
   *
   * @param viewtype
   * @param doctype
   * @param id
   * @param surpress - the buttons
   * @param options
   */
  public static request_buttons(props: Action_Request_Props_I) {
    let request: Action_Request = {
      request_type: `request:show-${props.viewtype}-buttons`,
      target: DOCTYPE_HEADER_BUTTONS, //this is the target-component we address

      view: props.viewtype,
      doctype: props.doctype,
      id: props.id,

      surpress: props.surpress,
      options: props.options,
      doclabel: props.doclabel,
    };

    window.electronAPI.send(IPC_BUTTON_ACTION, [request]);
  }
}
