import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Input, Form, Button, Flex } from "antd";
import { v4 as uuidv4 } from "uuid";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { DocType } from "../../../common/types/DocType";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { FormTool_IPC } from "../../../frontend/FormTool_IPC";
import { Calculation } from "../../../common/types/DocCalculation";
import { My_PriceSimple_Input } from "../../../frontend/myPriceSimple_Input";
import { modul_props } from "../modul_props";

const { TextArea } = Input;

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function CalculationForm() {

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Calculation>(new Calculation());
  const triggerSaveRef = React.useRef(null);

    useEffect(() => {
    // Beim laden der Seite...
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
      handleResultCallback: function (result: any): void {
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
    FormTool_IPC.save_data<Calculation>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Calculation) => {
      //! has new rev from backend
      setDataOrigin(result);
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
              message: `Bitte den Titel der ${doclabel} angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="description">
          <Input.TextArea rows={4} placeholder="Please enter a Description" />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>

        <Form.Item label="Kalkulation" name="calc">
          <Form.List name="calc">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <div
                    key={key}
                    style={{
                      width: "100%",
                      backgroundColor: "#efefef",
                      border: 10,
                      borderColor: "black",
                    }}
                  >
                    <Flex
                      gap="small"
                      justify="space-between"
                      align="flex-start"
                      style={{ backgroundColor: "white" }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, "title"]}
                        style={{ width: "100%" }}
                        rules={[{ required: true, message: "Titel fehlt." }]}
                      >
                        <Input placeholder="Titel" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "value"]}
                        rules={[{ required: true, message: "Wert fehlt" }]}
                      >
                        <My_PriceSimple_Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, "id"]}
                        style={{ display: "none" }}
                      >
                        <Input placeholder="ID" defaultValue={uuidv4()} />
                      </Form.Item>
                      <Button
                        onClick={() => remove(name)}
                        type="primary"
                        icon={<MinusCircleOutlined />}
                        style={{ padding: 10 }}
                      />
                    </Flex>
                    <Form.Item {...restField} name={[name, "shortnote"]}>
                      <TextArea rows={3} />
                    </Form.Item>
                  </div>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Position hinzufügen
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
