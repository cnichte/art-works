import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Row,
  Segmented,
  Select,
  Space,
  theme,
} from "antd";

const { Option } = Select;

import { Modul_Props_I } from "../common/Modul_Props";

export interface MyBasicList_SearchPanel_Props<T> {
  modul_props: Modul_Props_I;
  show: boolean;
  searchPanelType: SearchPanelType;
}

export interface MyBasicList_SearchPanel_Buttons_Props<T> {
  show: boolean;
  onChange: (value: SearchPanelType) => void;
}

export type SearchPanelType = "text" | "attribut" | "metadata";

export function getSearchPanelOptions(): Array<any> {
  let options = [
    {
      label: "Text",
      value: "text",
    },
    {
      label: "Attribut",
      value: "attribut",
    },
    {
      label: "Metadata",
      value: "metadata",
    },
  ];

  return options;
}

export function MyBasicList_SearchPanel_Buttons<T>({
  show,
  onChange,
}: MyBasicList_SearchPanel_Buttons_Props<T>) {
  return show ? (
    <Segmented<SearchPanelType>
      options={getSearchPanelOptions()}
      defaultValue="text"
      onChange={(value) => {
        onChange(value);
      }}
    />
  ) : null;
}

//! https://ant.design/components/form#form-demo-advanced-search

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export function MyBasicList_SearchPanel<T>({
  modul_props,
  show,
  searchPanelType,
}: MyBasicList_SearchPanel_Props<T>) {
  const { token } = theme.useToken();

  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();

  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,

    backgroundColor: "#efefef",
    display: show ? "block" : "none",
  };

  const getFormularFields = (searchPanelType: SearchPanelType) => {

    const children = [];

    //! Text Formular

    children.push(
      // Das variiert je nach Dokumententyp
      <Select
        style={{
          width: 250,
          display: searchPanelType === "text" ? "flex" : "none",
        }}
        defaultValue={"all"}
        options={[
          { value: "all", label: "Alle durchsuchbaren Felder" },
          { value: "filename", label: "Dateiname" },
          { value: "title", label: "Titel" },
          { value: "description", label: "Beschreibung" },
        ]}
      />
    );
    children.push(
      // Das variiert je nach Dokumententyp
      <Select
        style={{
          width: 150,
          display: searchPanelType === "text" ? "flex" : "none",
        }}
        defaultValue={"contains"}
        options={[
          { value: "contains", label: "Enthält" },
          { value: "contains-all", label: "Enthält alles" },
          { value: "contains-words", label: "Enthält Wörter" },
          { value: "contains-not", label: "Enthält nicht" },
          { value: "starts-with", label: "Beginnt mit" },
          { value: "ends-with", label: "Endet mit" },
          { value: "is-empty", label: "Ist leer" },
          { value: "is-not-empty", label: "Ist nicht leer" },
        ]}
      />
    );

    children.push(
      <Form.Item
        style={{
          width: 250,
          display: searchPanelType === "text" ? "flex" : "none",
        }}
        name={`searchtext`}
        rules={[
          {
            required: true,
            message: "Input something!",
          },
        ]}
      >
        <Input placeholder="placeholder" />
      </Form.Item>
    );

    //! Attribut Formular

    children.push(
      <Form.Item
        style={{
          width: 250,
          display: searchPanelType === "attribut" ? "flex" : "none",
        }}
        name={`searchtext`}
        label={"Attribut Suche"}
        rules={[
          {
            required: true,
            message: "Input something!",
          },
        ]}
      >
        <Input placeholder="placeholder" />
      </Form.Item>
    );

    //! Metadata Formular

    children.push(
      <Form.Item
        style={{
          width: 250,
          display: searchPanelType === "metadata" ? "flex" : "none",
        }}
        name={`searchtext`}
        label={"Metadata Suche"}
        rules={[
          {
            required: true,
            message: "Input something!",
          },
        ]}
      >
        <Input placeholder="placeholder" />
      </Form.Item>
    );

    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  return (
    <Form
      form={form1}
      name="advanced_search_1"
      style={{
        maxWidth: "none",
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,

        backgroundColor: "#efefef",
        display: show ? "block" : "none",
      }}
      onFinish={onFinish}
      hidden={searchPanelType == "text" ? true : false}
    >
      <Row gutter={24}>{getFormularFields(searchPanelType)}</Row>

      <div style={{ textAlign: "right" }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form1.resetFields();
            }}
          >
            Clear
          </Button>
          <a
            style={{ fontSize: 12 }}
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <DownOutlined rotate={expand ? 180 : 0} /> Collapse
          </a>
        </Space>
      </div>
    </Form>
  );
}
