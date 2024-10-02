import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Select, Input, Form, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
//* above are the default imports

// Additional imports
import type { RcFile } from "antd/es/upload";

// Application imports
import { MyInputURLField } from "../../../frontend/components/myInputFields";
import { MyDatePicker } from "../../../frontend/components/myDatePicker";

import { Action_Request, DB_Request } from "../../../common/types/system/RequestTypes";
import { DocType } from "../../../common/types/DocType";
import { FormPropertiesInterface } from "../../../common/types/system/FormPropertiesInterface";
import { IPC_DATABASE } from "../../../common/types/system/IPC_Channels";

import { Address } from "../../../common/types/documents/DocAddress";
import { modul_props } from "../modul_props";
import { FormTool_IPC } from "../../../frontend/tools/FormTool_IPC";
import { RequestData_IPC } from "../../../frontend/tools/RequestData_IPC";
import { AddressType } from "../../../common/types/documents/DocAddressType";

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function AddressForm() {
  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string = modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();

  const [dataOrigin, setDataOrigin] = useState<Address>(new Address());
  const [addressTypes, setAddressTypes] = useState<AddressType[]>([]);

  const triggerSaveRef = React.useRef(null);

  // TODO FormPropertiesInterface wird nicht mehr gebraucht?
  const props: FormPropertiesInterface = {
    id,
    moduleLabel: doclabel,
    moduleId: doctype,
    segment: segment,
  };

    useEffect(() => {
    // Beim laden der Seite...
    //* Wird einmalig beim Laden der Seite ausgeführt.
    const request: DB_Request = {
      type: "request:data-from-id",
      doctype: modul_props.doctype,
      id: id,
      request_options: ["use_relation"],
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
        if (response.type === "request:show-settings-dialog-action") {
          console.log(
            `Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`
          );
        }
      },
    });

    const request_2: DB_Request = {
      type: "request:data-from-id",
      doctype: "addressType",
      request_options: [],
    };

    RequestData_IPC.load_data<any>({
      // TODO AddressType[] statt <any>
      modul_props: modul_props,
      ipc_channel: "ipc-database",
      request: request_2,
      setDataCallback: function (result: any): void {
        setAddressTypes(result.addressTypes);
      },
    });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    FormTool_IPC.save_data<Address>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Address) => {
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

  function getAddressTypeOptions(): Array<any> {
    return addressTypes.map((item: { id: any; name: any }) => {
      return { value: item.id, label: item.name };
    });
  }
  const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleAddressTypeChange = (value: string) => {
    // TODO: Form.Items anzeigen und ausblenden siehe saleForm
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
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            ref={triggerSaveRef}
            style={{ display: "none" }}
          />
        </Form.Item>

        <Form.Item
          label="Typ"
          name="addressType"
          tooltip={{
            title: "Typ des Kontakts / der Addresse",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Select
            defaultValue="0ae7570a-603c-43f3-9667-5aa019dd27eb" // Print (Standard)
            onChange={handleAddressTypeChange}
            options={getAddressTypeOptions()}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Namen eingeben." }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Geburtstag" name="birthdate">
          <MyDatePicker />
        </Form.Item>
        <Form.Item label="Postleitzahl" name="postalCode">
          <Input />
        </Form.Item>
        <Form.Item label="Ort" name="city">
          <Input />
        </Form.Item>
        <Form.Item label="Strasse und Hausnummer" name="street">
          <Input />
        </Form.Item>
        <Form.Item label="Webseite" name="url">
          <MyInputURLField />
        </Form.Item>
        <Form.Item label="eMail" name="mail">
          <Input />
        </Form.Item>
        <Form.Item label="Telefon" name="phone">
          <Input />
        </Form.Item>
        <Form.Item label="Notiz" name="note">
          <Input />
        </Form.Item>
        <Form.Item label="Tags" name="tags">
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}
