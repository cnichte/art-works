import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { getSnapshot, loadSnapshot, useEditor } from "tldraw";

import { WhiteboardI } from "../../../common/types/DocWhiteboard";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { FormTool_IPC } from "../../../frontend/FormTool_IPC";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { Modul_Props_I } from "../../../common/Modul_Props";

interface MyProps {
  id: string;
  modul_props: Modul_Props_I;
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
export function My_Tldraw_PersistenceManager({ id, modul_props }: MyProps) {
  const [form] = Form.useForm();
  const editor = useEditor();
  const [dataOrigin, setDataOrigin] = useState(null);

  const triggerSaveRef = React.useRef(null);

  useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    const request: DB_Request = {
      type: "request:data",
      doctype: modul_props.doctype,
      id: id,
      options: {},
    };

    const buaUnsubscribe_func = FormTool_IPC.init_and_load_data<any>({
      viewtype: "form",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-database",

      surpress_buttons: false,
      setDataCallback: function (result: any): void {
        setDataOrigin(result.whiteboards[0]);
        //!load data to Tldraw
        loadSnapshot(editor.store, JSON.parse(result.whiteboards[0].content));
      },
      doButtonActionCallback: function (response: Action_Request): void {
        if (response.type === "request:save-action") {
          triggerSaveRef.current?.click();
        }
      },
    });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    //! Transport Tldraw document to form data
    const { document, session } = getSnapshot(editor.store);
    valuesForm.content = JSON.stringify({ document, session });

    FormTool_IPC.save_data<WhiteboardI>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: WhiteboardI) => {
      //! has new rev from backend
      setDataOrigin(result);
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
