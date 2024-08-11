import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Input, Form, Button, Select } from "antd";

import { InfoCircleOutlined } from "@ant-design/icons";
import { DocType } from "../../../common/types/DocType";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { FormTool } from "../../../frontend/FormTool";
import { Publication } from "../../../common/types/DocPublication";
import { modul_props } from "../modul_props";

//* above are the default imports

//* Room for additional imports

//* Application imports

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
export function PublicationForm() {
  const navigate = useNavigate();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string = modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Publication>();
  const triggerSaveRef = React.useRef(null);

  const [publicationTypes, setPublicationTypes] = useState([]);
  const [publicationWhats, setPublicationWhats] = useState([]);
  const [publicationMediums, setPublicationMediums] = useState([]);

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

    const request_2: DB_Request = {
      type: "request:data",
      doctype: "publicationType",
      options: {},
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request_2])
      .then((result: any) => {
        setPublicationTypes(result.publicationTypes);
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });

    // TODO FormTools.customRequest('ipc-database', 'request:publicationWhat-list-custom','','');

    const request_3: DB_Request = {
      type: "request:data",
      doctype: "publicationWhat",
      options: {},
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request_3])
      .then((result: any) => {
        setPublicationWhats(result.publicationWhats);
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });

    // TODO FormTools.customRequest('ipc-database', 'request:publicationMedium-list-custom','','');

    const request_4: DB_Request = {
      type: "request:data",
      doctype: "publicationMedium",
      options: {},
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request_4])
      .then((result: any) => {
        setPublicationMediums(result.publicationMediums);
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
    let ft: FormTool<Publication> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Publication) => {
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

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  // TODO refactorieren wegen publicationTypes etc...
  function getPublicationTypeOptions(): Array<any> {
    return publicationTypes.map((item: { id: any; name: any }) => {
      return { value: item.id, label: item.name };
    });
  }

  /**
    [
      {
        label: 'Manager',
        options: [
          { label: 'Jack', value: 'jack' },
          { label: 'Lucy', value: 'lucy' },
        ],
      },
      {
        label: 'Engineer',
        options: [{ label: 'yiminghe', value: 'Yiminghe' }],
      },
    ]
     */
  function getPublicationWhatOptions(): Array<any> {
    return publicationWhats.map(
      (item: { id: any; name: any; children: any }) => {
        const test = {
          label: item.name,
          options: item.children.map((child: { id: any; name: any }) => {
            return { value: child.id, label: child.name };
          }),
        };

        return test; // { value: item.id, label: item.name }
      }
    );
  }

  function getPublicationMediumOptions(): Array<any> {
    return publicationMediums.map(
      (item: { id: any; name: any; children: any }) => {
        const test = {
          label: item.name,
          options: item.children.map((child: { id: any; name: any }) => {
            return { value: child.id, label: child.name };
          }),
        };

        return test; // { value: item.id, label: item.name };
      }
    );
  }

  const handlePublicationTypeChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    console.log(`selected ${value}`);
  };
  const handlePublicationWhatChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    console.log(`selected ${value}`);
  };
  const handlePublicationMediumChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    console.log(`selected ${value}`);
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
        <Form.Item label="Untertitel" name="subtitle">
          <Input />
        </Form.Item>
        <Form.Item
          label="Typ"
          name="publicationType"
          tooltip={{
            title: "Der Typ der  Publikation",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Select
            defaultValue="11f51946-81ce-4aa4-8229-8d64687f4e08" // Eigene Publikation
            onChange={handlePublicationTypeChange}
            options={getPublicationTypeOptions()}
            style={{ width: 270 }}
          />
        </Form.Item>
        <Form.Item
          label="Art"
          name="publicationWhat"
          tooltip={{
            title: "Art der Publikation",
            icon: <InfoCircleOutlined />,
          }}
        >
          <Select
            defaultValue="88c68507-4c4e-41cb-bf26-79f94e46b7f8" // Buch
            onChange={handlePublicationWhatChange}
            options={getPublicationWhatOptions()}
            style={{ width: 270 }}
          />
        </Form.Item>
        <Form.Item
          label="Medium"
          name="publicationMedium"
          tooltip={{ title: "Das Medium...", icon: <InfoCircleOutlined /> }}
        >
          <Select
            defaultValue="ced67c12-73bd-48d9-b460-1d03c4f92097" // Medium Papier
            onChange={handlePublicationMediumChange}
            options={getPublicationMediumOptions()}
            style={{ width: 270 }}
          />
        </Form.Item>
        <Form.Item label="ISBN" name="isbn">
          <Input />
        </Form.Item>
        <Form.Item label="Verlag" name="publisher">
          <Input />
        </Form.Item>
        <Form.Item label="Nationalbibliothek" name="nationallibrary">
          <Input />
        </Form.Item>
        <Form.Item label="Webadresse" name="url">
          <Input />
        </Form.Item>
        <Form.Item label="Beschreibung" name="description">
          <Input.TextArea rows={4} placeholder="Please enter some Content." />
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