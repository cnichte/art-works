import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Input, Form, Button, Flex } from "antd";
import { v4 as uuidv4 } from "uuid";

import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { DocType } from "../../../common/types/DocType";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { FormTool } from "../../../frontend/FormTool";
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
  const navigate = useNavigate();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Calculation>();
  const triggerSaveRef = React.useRef(null);

  useEffect(() => {
    //* Wird einmalig beim Laden der Seite ausgeführt.
    console.info("Request some data from backend...");
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
    let ft: FormTool<Calculation> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Calculation) => {
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
