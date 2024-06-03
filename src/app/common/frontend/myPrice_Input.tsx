import { useState } from "react";
import { Button, Flex, InputNumber, Rate, Select } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import { Props_FormItem } from "./types/FormPropertiesInterface";

const { Option } = Select;

const selectAfter = (
  <Select defaultValue="USD" style={{ width: 60 }}>
    <Option value="USD">$</Option>
    <Option value="EUR">€</Option>
    <Option value="GBP">£</Option>
    <Option value="CNY">¥</Option>
  </Select>
);

export function My_Price_Input({
  value = '',
  onChange,
}: Props_FormItem<string>): any {

  const triggerChange = (changedValue: any) => {
    onChange?.(changedValue);
  };

  return (

    <Flex gap="small" wrap>
    <InputNumber<string>
      style={{ width: 200 }}
      defaultValue="0"
      min="0"
      step="0.01"
      stringMode
      value={value}
      onChange={triggerChange}
      addonAfter={selectAfter}
    />
    <Button icon={<CalculatorOutlined />}></Button>
  </Flex>

  );
}