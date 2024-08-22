import React, { useEffect, useState } from "react";
import { Button, Form, Input } from "antd";
import { getSnapshot, getSvgAsImage, loadSnapshot, useEditor } from "tldraw";

import { WhiteboardI } from "../../../common/types/DocWhiteboard";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { FormTool_IPC } from "../../../frontend/FormTool_IPC";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { Modul_Props_I } from "../../../common/Modul_Props";
import { Image_Util } from "../../../frontend/Image_Util";

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

// Add local image Example
// https://github.com/tldraw/tldraw/blob/main/apps/examples/src/examples/local-images/LocalImagesExample.tsx

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
        if (response.type === "request:show-settings-dialog-action") {
          console.log(
            `Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`
          );
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

    // https://discord.com/channels/859816885297741824/1204349269008449587/1235167139938172988
    const shapeIds = editor.getCurrentPageShapeIds();

    editor
      .getSvgString([...shapeIds], {
        scale: 1,
        background: false,
      })
      .then(({ svg, height, width }) => {
        getSvgAsImage(editor, svg, {
          type: "png",
          quality: 1,
          scale: 0.5,
          width: width,
          height: height,
        }).then((value: Blob) => {
          console.log("TLDraw getSvgAsImage:", width, height);

          Image_Util.read_image_as_base64(value).then((val: string) => {
            valuesForm.preview = val; //! inject preview

            FormTool_IPC.save_data<WhiteboardI>({
              ipcChannel: IPC_DATABASE,
              dataObject: dataOrigin,
              valuesForm: valuesForm,
              force_save: false,
              modul_props: modul_props,
            }).then((result: WhiteboardI) => {
              //! has new rev from backend
              setDataOrigin(result);
            }); // FormTool_IPC.save_data
          }); // Image_Util.read_image_as_base64
        }); // getSvgAsImage
      }); // editor.getSvgString
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
