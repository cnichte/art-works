import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Form, FormProps, Input, Select } from "antd";

import { DbOptions_Setting, DbOptionsType } from "../../../../common/types/SettingTypes";
import { modul_props } from "../modul_props";
import { FormTool_IPC } from "../../../../frontend/framework/tools/FormTool_IPC";
import { App_Messages_IPC } from "../../../../frontend/framework/tools/App_Messages_IPC";
import { DocCatalog, DocCatalogType } from "../../../../common/framework/types/documents/DocCatalog";
import { IPC_SETTINGS } from "../../../../common/framework/types/system/IPC_Channels";
import { Settings_Request, Action_Request, Settings_RequestData } from "../../../../common/framework/types/system/RequestTypes";

const { TextArea } = Input;

export function Catalog_Form() {
  const { id } = useParams();
  const triggerSaveRef = React.useRef(null);

  const [form] = Form.useForm();
  const [dataObject, setDataObject] = useState<DocCatalog>(new DocCatalog());

  const [dboptions, setDBOptions] = useState<DbOptions_Setting[]>([
    {
      type: "local",
      template: "{name}",
      label: "",
    },
  ]);
  const [isLocal, setLocal] = useState<boolean>(false);
  const [uripreview, setUriPreview] = useState<string>("TEST");

  type MyForm_FieldType = {
    name: string;
    templateName: string;
    templateDescription: string;
    protocoll: string;
    dbOption: DbOptionsType;
    dbHost: string;
    dbPort: string;
    dbName: string;
    dbUser: string;
    dbPassword: string;
    dbTemplate: string;
  };

  function reset_form(): void {
    // init form
    setDataObject(new DocCatalog());
    // see ../../../backend/Database_Settings.ts

    form.resetFields();
  }

    useEffect(() => {
    // Beim laden der Seite...
    reset_form();

    const request: Settings_Request = {
      request_type: "request:get-connection",
      doctype: modul_props.doctype,
      id: id,
      request_options: [],
    };

    const buaUnsubscribe_func = FormTool_IPC.init_and_load_data<DocCatalog>({
      viewtype: "form",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-settings",

      surpress_buttons: false,
      setDataCallback: function (result: DocCatalog): void {
        setDataObject(result);
        form.setFieldsValue(result);
        
        changeDBOptions(result.dbOption);

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

    const request_2: Settings_Request = {
      request_type: "request:get-dbOptions",
      doctype: modul_props.doctype,
      id: id,
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request_2])
      .then((result: DbOptions_Setting[]) => {
        setDBOptions(result);
        changeDBOptions("local");
        setLocal(true);
        buildURIFromTemplate();
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

  const onFinish: FormProps<MyForm_FieldType>["onFinish"] = (formValues) => {
    // create a new record and save the data.
    // i do not use the default here
    let request: Settings_RequestData<DocCatalog> = {
      request_type: "request:save-connection",
      doctype: modul_props.doctype,
      id: id,
      data: null,
      request_options: [], // dont use "use_relation" here
    };

    FormTool_IPC.save_data<DocCatalog>({
      ipcChannel: "ipc-settings",
      request: request,
      dataObject: dataObject,
      valuesForm: formValues,
      force_save: false,
      modul_props: modul_props,
    }).then((result: DocCatalogType) => {
      //! has new _rev from backend
      setDataObject(result);
    });
  };

  const onFinishFailed: FormProps<MyForm_FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  function onFormReset(): void {
    reset_form();
  }

  function getDBOptions(): Array<any> {
    return dboptions.map((item: DbOptions_Setting) => {
      return { value: item.type, label: item.label };
    });
  }

  function handleDBOptionsChange(value: string, option: any): void {
    changeDBOptions(value);
  }

  function changeDBOptions(type: string): void {
    if (type === "local") {
      setLocal(true);
    } else {
      setLocal(false);
    }
    // TODO dafür noch Settings-Typen oder interfaces definieren.
    let found_template: DbOptions_Setting = dboptions.find(
      (item: DbOptions_Setting) => item.type == type
    );

    form.setFieldValue("dbTemplate", found_template.template);
    buildURIFromTemplate();
  }

  const handleNameChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    buildURIFromTemplate();
    form.setFieldValue(
      "dbName",
      e.target.value.toLowerCase().replace(/ /g, "-")
    );
  };

  const handleCreateDBChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  function buildURIFromTemplate(): void {
    let dbTemplate: string = form.getFieldValue("dbTemplate");
    let db_option: any = { // DocCatalogType
      dbHost:
        form.getFieldValue("dbHost") == null
          ? " "
          : form.getFieldValue("dbHost"),
      dbPort:
        form.getFieldValue("dbPort") == null
          ? " "
          : form.getFieldValue("dbPort"),
      dbName:
        form.getFieldValue("dbName") == null
          ? " "
          : form.getFieldValue("dbName"),
      dbUser:
        form.getFieldValue("dbUser") == null
          ? " "
          : form.getFieldValue("dbUser"),
      dbPassword:
        form.getFieldValue("dbPassword") == null
          ? " "
          : form.getFieldValue("dbPassword"),
    };

    let result: string = "";

    if (dbTemplate != null) {


    result = dbTemplate.replace(
        /{(\w+)}/g,
        function (_: any, k: string | number) {
          return db_option[k];
        }
      );
    }

    setUriPreview(result);
  }

  const { Option } = Select;

  const selectBefore = (
    <Select defaultValue="http://">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <>
      <Form
        form={form}
        name="catalog-form"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true, dbOption: "local" }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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

        <Form.Item<MyForm_FieldType>
          label="Bezeichnung"
          name="templateName"
          rules={[{ required: true, message: "A name, please." }]}
        >
          <Input onChange={handleNameChange} />
        </Form.Item>

        <Form.Item<MyForm_FieldType>
          label="Description"
          name="templateDescription"
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item<MyForm_FieldType> label="Art der Datenbank" name="dbOption">
          <Select onChange={handleDBOptionsChange} options={getDBOptions()} />
        </Form.Item>
        <Form.Item<MyForm_FieldType>
          style={isLocal ? { display: "none" } : {}}
          label="Host"
          name="dbHost"
        >
          <Input addonBefore={selectBefore} onChange={buildURIFromTemplate} />
        </Form.Item>
        <Form.Item<MyForm_FieldType>
          style={isLocal ? { display: "none" } : {}}
          label="Port"
          name="dbPort"
        >
          <Input onChange={buildURIFromTemplate} />
        </Form.Item>
        <Form.Item<MyForm_FieldType> label="Datenbank-Name" name="dbName">
          <Input disabled />
        </Form.Item>
        <Form.Item<MyForm_FieldType>
          label="User"
          name="dbUser"
          style={isLocal ? { display: "none" } : {}}
        >
          <Input onChange={buildURIFromTemplate} />
        </Form.Item>

        <Form.Item<MyForm_FieldType>
          label="Password"
          name="dbPassword"
          style={isLocal ? { display: "none" } : {}}
        >
          <Input onChange={buildURIFromTemplate} />
        </Form.Item>

        <Form.Item<MyForm_FieldType>
          label="Template"
          name="dbTemplate"
          // noStyle
        >
          <Input disabled />
          <span>{uripreview}</span>
        </Form.Item>
      </Form>

      <ul>
        <li>uuid: {dataObject?.id}</li>
      </ul>
    </>
  );
}
