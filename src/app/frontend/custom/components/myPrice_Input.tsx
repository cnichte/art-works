import { Button, Flex, InputNumber, Rate, Select } from "antd";
import { CalculatorOutlined } from "@ant-design/icons";
import { FormItem_Props } from "../../../common/framework/types/system/FormPropertiesInterface";

const { Option } = Select;

const selectAfter = (
  <Select defaultValue="USD" style={{ width: 60 }}>
    <Option value="USD">$</Option>
    <Option value="EUR">€</Option>
    <Option value="GBP">£</Option>
    <Option value="CNY">¥</Option>
  </Select>
);

/**
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 */
export function My_Price_Input({
  value = '',
  onChange,
}: FormItem_Props<string>): any {

  const triggerChange = (changedValue: any) => {
    onChange?.(changedValue);
  };

  return (

    <Flex gap="small">
    <InputNumber<string>
      style={{ width: 50 }}
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
