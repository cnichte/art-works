import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";

import { Space, Input, Form, Button, Select, SelectProps } from "antd";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { DocType } from "../../../common/types/DocType";
import { Sale } from "../../../common/types/DocSale";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { Action_Request, DB_Request } from "../../../common/types/RequestTypes";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { FormTool } from "../../../frontend/FormTool";

//* above are the default imports

//* Room for additional imports

//* Application imports

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/**
 * TODO Search the Artwork / Edition / Publication.
 * https://ant.design/components/select
 * https://codesandbox.io/s/dx685g
 * https://codesandbox.io/s/3d5zcp?file=/demo.tsx:1248-1255
 * https://codesandbox.io/s/j25fgl?file=/demo.tsx:2219-2227
 *
 * @param props
 * @returns
 */
// eslint-disable-next-line no-undef
const SearchInput: React.FC<{
  placeholder: string;
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line react/function-component-definition
}> = (props) => {
  const [data, setData] = useState<SelectProps["options"]>([]);
  const [value, setValue] = useState<string>();

  const showSearch = true;

  const handleSearch = (searchValue: string) => {
    console.log("############### query artworks");
    // TODO fetch(newValue, setData); from DB...
    // https://pouchdb.com/api.html#batch_fetch
    // TODO FormTools.customRequest('ipc-database', 'request:artworks-query-custom', searchValue, {});
  };

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <Select
      showSearch={showSearch}
      value={value}
      suffixIcon={null}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={null}
      options={(data || []).map((d) => ({
        value: d.value,
        label: d.text,
      }))}
    />
  );
};

/**
 * Formular für das Modul Note.
 *
 * @returns NoteForm
 */
function SaleForm() {
  const navigate = useNavigate();

  const doclabel: string = "Verkauf";
  const doctype: DocType = "sale";
  const segment: string = "sales";

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Sale>();
  const [saleTypes, setSaleTypes] = useState([]);

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

    const request_2: DB_Request = {
      type: "request:data",
      doctype: "saleType",
      options: {},
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request_2])
      .then((result: any) => {
        setSaleTypes(result.saleTypes); //
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
    let ft: FormTool<Sale> = new FormTool();

    ft.save_data({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
    })
      .then((result: Sale) => {
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

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  //* SaleTypes
  // TODO refactorieren wegen publicationTypes etc...
  function getSaleTypeOptions(): Array<any> {
    return saleTypes.map((item: { id: any; name: any }) => {
      return { value: item.id, label: item.name };
    });
  }

  //* Required Fields, and FormItems show/hide
  // Wir haben drei Optionen bei den Feldern, abhängig vom SalesType:
  // Zwei Dinge müssen damit eingestellt werden:
  // 1.) Ist das Feld (oder die Felder) required.
  // 2.) Ist das Feld (oder die Felder) sichtbar.
  const [isArtwork, setIsArtwork] = useState<boolean>(true);
  const [isEdition, setIsEdition] = useState<boolean>(false);
  const [isPublication, setIsPublication] = useState<boolean>(false);

  const editSaleTypeOptions = () => {
    console.log("editSaleTypeOptions");
  };

  const handleSaleTypeChange = (value: string) => {
    // Felder ein-/ausblenden, und required/optional.
    // console.log(`selected ${value}`);

    // TODO Clear the other fields (aber erst beim speichern?)
    switch (value) {
      case "0ad711be-179b-4fd6-b069-3ee8ada9591a": {
        // Fineartprint (Edition)
        setIsArtwork(false); // false = 'optional'
        setIsEdition(true);
        setIsPublication(false);
        break;
      }
      case "2932a605-48aa-4368-96b7-21aed8103e38": {
        // Buchverkauf, Publication
        setIsArtwork(false);
        setIsEdition(false);
        setIsPublication(true);
        break;
      }
      case "2fa71a66-03e5-49c5-bfeb-b98108ea49ea": {
        // Dienstleistung
        setIsArtwork(false);
        setIsEdition(false);
        setIsPublication(false);
        break;
      }
      default: {
        // Artwork;
        setIsArtwork(true);
        setIsEdition(false);
        setIsPublication(false);
        break;
      }
    }
  };

  //* Search the Artwork / Edition / Publication

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
          name="saleType"
          tooltip={{ title: "Was wird verkauft", icon: <InfoCircleOutlined /> }}
        >
          <Space wrap>
            <Select
              defaultValue="0ae7570a-603c-43f3-9667-5aa019dd27eb" // Print (Standard)
              onChange={handleSaleTypeChange}
              options={getSaleTypeOptions()}
              style={{ width: 270 }}
            />
            <Button onClick={editSaleTypeOptions}>
              <EditOutlined />
            </Button>
          </Space>
        </Form.Item>
        <Form.Item
          style={isArtwork ? {} : { display: "none" }}
          label="Werk"
          name="artwork"
          tooltip="Das Kunstwerk"
          rules={[
            {
              required: isArtwork,
              message: `Bitte das Werk angeben!`,
            },
          ]}
        >
          <SearchInput placeholder="search an Artwork" />
        </Form.Item>
        <Form.Item
          style={isEdition ? {} : { display: "none" }}
          label="Edition"
          name="edition"
          rules={[
            {
              required: isEdition,
              message: `Bitte die Edition angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          style={isPublication ? {} : { display: "none" }}
          label="Publikation"
          name="publication"
          rules={[
            {
              required: isPublication,
              message: `Bitte die Publikation angeben!`,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={isEdition ? {} : { display: "none" }}
          label="Nummer der Edition"
          name="editionNumber"
        >
          <Input />
        </Form.Item>
        <Form.Item label="Kalkulierter Preis" name="calculatedPrice">
          <Input />
        </Form.Item>
        <Form.Item label="Bezahlter Preis" name="paid">
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

export default SaleForm;
