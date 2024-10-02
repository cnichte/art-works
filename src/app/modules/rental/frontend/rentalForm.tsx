import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { Space, Input, Form, Button, Select, SelectProps } from "antd";

import { InfoCircleOutlined, EditOutlined } from "@ant-design/icons";

import { DocType } from "../../../common/types/DocType";
import { App_Messages_IPC } from "../../../frontend/tools/App_Messages_IPC";
import { FormTool_IPC } from "../../../frontend/tools/FormTool_IPC";
import { modul_props } from "../modul_props";
import { Rental } from "../../../common/custom/types/documents/DocRental";
import { IPC_DATABASE } from "../../../common/framework/types/system/IPC_Channels";
import { DB_Request, Action_Request } from "../../../common/framework/types/system/RequestTypes";

//* above are the default imports

//* Room for additional imports

//* Application imports

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
      showArrow={false}
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
export function RentalForm() {
  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const [form] = Form.useForm();
  // Die id wird als Parameter übergeben
  // entweder: 'new', oder eine uuid
  const { id } = useParams();
  const [dataOrigin, setDataOrigin] = useState<Rental>(new Rental());
  const [saleTypes, setSaleTypes] = useState([]);

  const triggerSaveRef = React.useRef(null);

    useEffect(() => {
    // Beim laden der Seite...
    //* Wird einmalig beim Laden der Seite ausgeführt.
    const request: DB_Request = {
      request_type: "request:data-from-id",
      doctype: modul_props.doctype,
      id: id,
      request_options: ["use_relation"],
    };

    const buaUnsubscribe_func = FormTool_IPC.init_and_load_data<any>({
      // TODO <Rental> statt <any>
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
        if (response.request_type === "request:save-action") {
          triggerSaveRef.current?.click();
        }
        if (response.request_type === "request:show-settings-dialog-action") {
          console.log(
            `Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`
          );
        }
      },
    });

    const request_2: DB_Request = {
      request_type: "request:data-from-id",
      doctype: "saleType",
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_DATABASE, [request_2])
      .then((result: any) => {
        setSaleTypes(result.addressTypes); //
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });


    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  const onFormFinish = (valuesForm: any) => {
    FormTool_IPC.save_data<Rental>({
      ipcChannel: IPC_DATABASE,
      dataObject: dataOrigin,
      valuesForm: valuesForm,
      force_save: false,
      modul_props: modul_props,
    }).then((result: Rental) => {
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