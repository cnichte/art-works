import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Space, Input, Form, Button } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

import { DocType } from "../../../common/types/DocType";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { DB_Request } from "../../../common/types/RequestTypes";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { Action_Request } from "../../../common/types/RequestTypes";
import { FormTool_IPC } from "../../../frontend/FormTool_IPC";
import { Edition } from "../../../common/types/DocEdition";
import { modul_props } from "../modul_props";

//* above are the default imports

//* Room for additional imports

//* Application imports

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function EditionForm() {

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Edition>(null);
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
      // TODO <Address> statt <any>
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
      },
    });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    FormTool_IPC.save_data<Edition>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Edition) => {
      //! has new rev from backend
      setDataOrigin(result);
    });
  };

  const onFormFinishFailed = (errorInfo: any) => {
    console.info("Failed:", errorInfo);
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
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: `Bitte den Namen der ${doclabel} angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="description">
          <Input.TextArea rows={4} placeholder="Please enter some Content." />
        </Form.Item>
        <Form.Item label="Edition Nummer" name="edition">
          <Input />
        </Form.Item>
        <Form.Item label="Anzahl Artist Prints" name="artistsPrint">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>
        <Form.Item label="Preise" name="prices">
          <Form.List name="prices">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, "id"]}
                      rules={[{ required: true, message: "ID Fehlt" }]}
                      style={{ display: "none" }}
                    >
                      <Input placeholder="ID" defaultValue={uuidv4()} />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "description"]}
                      rules={[
                        { required: true, message: "Bezeichnung fehlt." },
                      ]}
                    >
                      <Input placeholder="Bezeichnung" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "numberStart"]}
                      rules={[{ required: true, message: "Startnummer fehlt" }]}
                    >
                      <Input placeholder="Startnummmer" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "numberEnd"]}
                      rules={[{ required: true, message: "Endnummer fehlt" }]}
                    >
                      <Input placeholder="Endnumber" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, "price"]}
                      rules={[{ required: true, message: "Preis fehlt" }]}
                    >
                      <Input placeholder="Price" />
                    </Form.Item>
                    <Button
                      onClick={() => remove(name)}
                      type="primary"
                      icon={<MinusCircleOutlined />}
                    />
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Preis hinzufügen
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
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