import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Input, Form, Button, ColorPicker, Select, Divider } from "antd";

import { DocType } from "../../../common/types/DocType";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { FormTool_IPC } from "../../../frontend/FormTool_IPC";
import { Tag } from "../../../common/types/DocTag";
import { modul_props } from "../modul_props";

/**
 * Formular für das Modul Tag.
 *
 * @returns NoteForm
 */
export function TagForm() {
  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Tag>();

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
      // TODO <Tag> statt <any>
      viewtype: "form",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-database",

      surpress_buttons: false,
      setDataCallback: function (result: any): void {
        setDataOrigin(result[segment][0]);
        form.setFieldsValue(result[segment][0]);
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
    FormTool_IPC.save_data<Tag>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Tag) => {
      //! has new rev from backend
      setDataOrigin(result);
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
    console.log("search:", value);
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
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "tom",
                label: "Tom",
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
              message: "Bitte den Titel der Werkgruppe angeben!",
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
                label: "Recommended",
                colors: [
                  "#000000",
                  "#000000E0",
                  "#000000A6",
                  "#00000073",
                  "#00000040",
                  "#00000026",
                  "#0000001A",
                  "#00000012",
                  "#0000000A",
                  "#00000005",
                  "#F5222D",
                  "#FA8C16",
                  "#FADB14",
                  "#8BBB11",
                  "#52C41A",
                  "#13A8A8",
                  "#1677FF",
                  "#2F54EB",
                  "#722ED1",
                  "#EB2F96",
                  "#F5222D4D",
                  "#FA8C164D",
                  "#FADB144D",
                  "#8BBB114D",
                  "#52C41A4D",
                  "#13A8A84D",
                  "#1677FF4D",
                  "#2F54EB4D",
                  "#722ED14D",
                  "#EB2F964D",
                ],
              },
              {
                label: "Recent",
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