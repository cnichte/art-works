import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import {  Input, Form, Button } from "antd";

import { DocType } from "../../../common/types/DocType";
import { SaleRightsOfUse } from "../../../common/types/DocSaleRightsOfUse";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { FormTool_IPC } from "../../../frontend/FormTool_IPC";
import { modul_props } from "../modul_props";

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function SaleRightsOfUseForm() {
  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<SaleRightsOfUse>(new SaleRightsOfUse());

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
    FormTool_IPC.save_data<SaleRightsOfUse>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: SaleRightsOfUse) => {
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
              message: `Bitte das ${doclabel} angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung kurz" name="descriptionShort">
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung lang" name="descriptionLong">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
        </Form.Item>
        <Form.Item label="Webadresse" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="shortnote">
          <Input.TextArea rows={4} placeholder="Please enter a Shortnote" />
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