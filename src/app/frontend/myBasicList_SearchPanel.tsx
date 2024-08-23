import React, { useState } from "react";
import { DownOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
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
  const [form] = Form.useForm();
  const [expand, setExpand] = useState(false);

  const formStyle: React.CSSProperties = {
    maxWidth: "none",
    background: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    padding: 24,

    backgroundColor: "#efefef",
    display: show ? "block" : "none",
  };

  const getFields = (searchPanelType: SearchPanelType) => {
    const count = expand ? 10 : 6;
    const children = [];

    //! BEISPIEL für (un)sichtares Teilformular
    //! Ich mache hier aber für jedes Panel ein Formular und führe die Daten vor dem speichern
    //! zu einer anfrage zusammen ??
    // https://ant.design/components/form#form-demo-form-context
    // https://ant.design/components/form#form-demo-form-context

    children.push(
      <Form.Item
        name={`Text`}
        style={{
          visibility: searchPanelType == "text" ? "visible" : "hidden",
        }}
        label={`Text`}
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

    children.push(
      <Form.Item
        name={`Attribut`}
        style={{
          visibility: searchPanelType == "attribut" ? "visible" : "hidden",
        }}
        label={`Attribut`}
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

    children.push(
      <Form.Item
        name={`Metadata`}
        style={{
          visibility: searchPanelType == "metadata" ? "visible" : "hidden",
        }}
        label={`Metadata`}
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

    // !

    for (let i = 0; i < count; i++) {
      children.push(
        <Col span={8} key={i}>
          {i % 3 !== 1 ? (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: "Input something!",
                },
              ]}
            >
              <Input placeholder="placeholder" />
            </Form.Item>
          ) : (
            <Form.Item
              name={`field-${i}`}
              label={`Field ${i}`}
              rules={[
                {
                  required: true,
                  message: "Select something!",
                },
              ]}
              initialValue="1"
            >
              <Select>
                <Option value="1">
                  longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong
                </Option>
                <Option value="2">222</Option>
              </Select>
            </Form.Item>
          )}
        </Col>
      );
    }
    return children;
  };

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  // TODO  felder müssen unsichtbar geschaltet werden.

  return (
    <Form
      form={form}
      name="advanced_search"
      style={formStyle}
      onFinish={onFinish}
    >
      <Row gutter={24}>{getFields(searchPanelType)}</Row>

      <div style={{ textAlign: "right" }}>
        <Space size="small">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
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
