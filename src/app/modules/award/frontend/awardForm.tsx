import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Input, Form, Button } from "antd";

import { DocType } from "../../../common/types/DocType";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { DB_Request } from "../../../common/types/RequestTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Action_Request } from "../../../common/types/RequestTypes";
import { FormTool } from "../../../frontend/FormTool";
import { Award } from "../../../common/types/DocAward";

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
function AwardForm() {
  const navigate = useNavigate();

  const doclabel: string = "Auszeichnung";
  const doctype: DocType = "award";
  const segment: string = "awards";

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Award>();
  const triggerSaveRef = React.useRef(null);

  useEffect(() => {
    console.info("Request some data from backend...");
    Header_Buttons_IPC.request_buttons("form", doctype, id); // is perhaps id='new'

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
          setDataOrigin(result[segment][0]); //
          form.setFieldsValue(result[segment][0]);
          App_Messages_IPC.request_message(
            "request:message-info",
            App_Messages_IPC.get_message_from_request(request.type, doclabel)
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
          console.log("AddressForm says ACTION: ", response);
          triggerSaveRef.current?.click();
          // message.info(response.type);
        }
      }
    );

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    let ft: FormTool<Award> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Award) => {
        //! has new _rev from backend
        setDataOrigin(result);
        // update header-button-state because uuid has changed from 'new' to uuid.
        Header_Buttons_IPC.request_buttons("form", doctype, result.id);
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
    <div>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 1000 }}
        initialValues={{ remember: true }}
        onFinish={onFormFinish}
        onFinishFailed={onFormFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Titel"
          name="title"
          rules={[
            {
              required: true,
              message: `Bitte den Titel der ${doctype} angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Jahr" name="year">
          <Input />
        </Form.Item>
        <Form.Item label="Webadresse" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="description">
          <Input.TextArea rows={4} placeholder="" />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="" />
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
    </div>
  );
}

export default AwardForm;
