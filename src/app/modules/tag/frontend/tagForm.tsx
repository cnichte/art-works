import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Space, Typography, Input, Form, Button,
  ColorPicker, Select, Divider  } from 'antd';

import {
  UploadOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import { DocType } from '../../../common/types/DocType';
import Title from "antd/es/skeleton/Title";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { FormTool } from "../../../frontend/FormTool";
import { Tag } from "../../../common/types/DocTag";


/**
 * Formular für das Modul Tag.
 *
 * @returns NoteForm
 */
function TagForm() {
  const navigate = useNavigate();

  const doclabel: string = "Tag";
  const doctype: DocType = "tag";
  const segment: string = "tags";

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Tag>();

  const triggerSaveRef = React.useRef(null);

   useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
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
    let ft: FormTool<Tag> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Tag) => {
        //! has new _rev from backend
        setDataOrigin(result);
        // update header-button-state because uuid has changed from 'new' to uuid.
        Header_Buttons_IPC.request_buttons("form", doctype, result.id);
      })
      .catch(function (error:any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

   const onParentChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const onParentSearch = (value: string) => {
    console.log('search:', value);
  };

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
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
        <Form.Item label="Übergeordnets Tag" name="parent">
          <Select
            showSearch
            placeholder="Select a parent Tag"
            optionFilterProp="children"
            onChange={onParentChange}
            onSearch={onParentSearch}
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'tom',
                label: 'Tom',
              },
            ]}
          />
        </Form.Item>
        <Divider />
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: 'Bitte den Titel der Werkgruppe angeben!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Farbe" name="color">
          <ColorPicker
            allowClear
            presets={[
              {
                label: 'Recommended',
                colors: [
                  '#000000',
                  '#000000E0',
                  '#000000A6',
                  '#00000073',
                  '#00000040',
                  '#00000026',
                  '#0000001A',
                  '#00000012',
                  '#0000000A',
                  '#00000005',
                  '#F5222D',
                  '#FA8C16',
                  '#FADB14',
                  '#8BBB11',
                  '#52C41A',
                  '#13A8A8',
                  '#1677FF',
                  '#2F54EB',
                  '#722ED1',
                  '#EB2F96',
                  '#F5222D4D',
                  '#FA8C164D',
                  '#FADB144D',
                  '#8BBB114D',
                  '#52C41A4D',
                  '#13A8A84D',
                  '#1677FF4D',
                  '#2F54EB4D',
                  '#722ED14D',
                  '#EB2F964D',
                ],
              },
              {
                label: 'Recent',
                colors: [],
              },
            ]}
          />
        </Form.Item>
        <Form.Item label="Notiz" name="note">
          <Input.TextArea rows={4} placeholder="Please enter a note." />
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

export default TagForm;
