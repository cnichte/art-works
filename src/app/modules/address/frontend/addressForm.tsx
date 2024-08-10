import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Select, Input, Form, Button } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
//* above are the default imports

// Additional imports
import type { RcFile } from "antd/es/upload";

// Application imports
import { FormTool } from "../../../frontend/FormTool";
import { MyInputURLField } from "../../../frontend/myInputFields";
import { MyDatePicker } from "../../../frontend/myDatePicker";

import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";

import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { DocType } from "../../../common/types/DocType";
import { FormPropertiesInterface } from "../../../common/types/FormPropertiesInterface";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";

import { Address } from "../../../common/types/DocAddress";

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export default function AddressForm() {
  const navigate = useNavigate();

  const doclabel: string = "Kontakt";
  const doctype: DocType = "address";
  const segment: string = "addresses";

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();

  const [dataOrigin, setDataOrigin] = useState<Address>(null);
  const [addressTypes, setAddressTypes] = useState([]);
  
  const triggerSaveRef = React.useRef(null);



  // TODO FormPropertiesInterface wird nicht mehr gebraucht?
  const props: FormPropertiesInterface = {
    id,
    moduleLabel: doclabel,
    moduleId: doctype,
    segment: segment,
  };

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

    const request_2: DB_Request = {
      type: "request:data",
      doctype: "addressType",
      options: {},
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request_2])
      .then((result: any) => {
        setAddressTypes(result.addressTypes); //
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });

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
    let ft: FormTool<Address> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Address) => {
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