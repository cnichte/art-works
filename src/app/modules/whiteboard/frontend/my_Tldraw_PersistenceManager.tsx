import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { getSnapshot, loadSnapshot, useEditor } from "tldraw";

import { WhiteboardI } from "../../../common/types/DocWhiteboard";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { FormTool } from "../../../frontend/FormTool";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { DocType } from "../../../common/types/DocType";

interface MyProps {
  id: string;
  doctype: DocType;
  doclabel: string;
}

// https://tldraw.dev/docs/persistence
// https://github.com/tldraw/tldraw/blob/main/apps/examples/src/examples/snapshots/SnapshotExample.tsx
// TODO Error: useEditor must be used inside of the <Tldraw /> or <TldrawEditor /> components
// const editor = useEditor();

// https://www.youtube.com/watch?v=Hqj6UH-CEu4
// https://github.com/NagariaHussain/tldraw_whiteboard/blob/develop/tldraw_whiteboard/public/js/whiteboard/App.jsx
// https://github.com/NagariaHussain/tldraw_whiteboard/blob/develop/tldraw_whiteboard/public/js/whiteboard/DBStateManager.jsx

/**
 * Contains a hidden Form, so that I can apply my own "load and save" logic.
 * 
 * @param MyProps 
 * @returns 
 */
export function My_Tldraw_PersistenceManager({ id, doctype, doclabel }: MyProps) {
  const [form] = Form.useForm();
  const editor = useEditor();
  const [dataOrigin, setDataOrigin] = useState(null);

  const triggerSaveRef = React.useRef(null);

  useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    Header_Buttons_IPC.request_buttons({
      viewtype: "form",
      doctype: doctype,
      doclabel: doclabel,
      id: id, // is perhaps id='new'
      surpress: false,
      options: {},
    });

    if (id != "new") {
      //! Request Document from Database
      const request: DB_Request = {
        type: "request:data",
        doctype: doctype,
        id: id,
        options: {},
      };

      window.electronAPI
        .invoke_request(IPC_DATABASE, [request])
        .then((result: any) => {
          setDataOrigin(result.whiteboards[0]);

          //!load data to Tldraw
          loadSnapshot(editor.store, JSON.parse(result.whiteboards[0].content));

          App_Messages_IPC.request_message(
            "request:message-success",
            App_Messages_IPC.get_message_from_request(request.type, doctype)
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
    const buaUnsubscribe = window.electronAPI.listen_to(
      "ipc-button-action",
      (response: Action_Request) => {
        if (response.target === doctype && response.view == "form") {
          console.log("Whiteboard_Form says ACTION: ", response);
          triggerSaveRef.current?.click();
        }
      }
    );

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    let ft: FormTool<WhiteboardI> = new FormTool();

    //! Transport Tldraw document to form data
    const { document, session } = getSnapshot(editor.store);
    valuesForm.content = JSON.stringify({ document, session });

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: any) => {
        //! has new _rev from backend
        setDataOrigin(result);
        // update header-button-state because uuid has changed from 'new' to uuid.
        Header_Buttons_IPC.request_buttons({
          viewtype: "form",
          doctype: doctype,
          doclabel: doclabel,
          id: result.id, // is perhaps id='new'
          surpress: false,
          options: {},
        });
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000, display: "none" }}
        initialValues={{ remember: true }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        autoComplete="off"
      >
        <Form.Item name="content">
          <Input style={{ display: "none" }} />
        </Form.Item>
        <Form.Item name="preview">
          <Input style={{ display: "none" }} />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            ref={triggerSaveRef}
            style={{ display: "none" }}
          />
        </Form.Item>
      </Form>
    </>
  );
}
