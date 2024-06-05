import { Flex, InputNumber } from "antd";
import { FormItem_Props } from "./types/FormPropertiesInterface";

export function My_PriceSimple_Input({
  value = '',
  onChange,
}: FormItem_Props<string>): any {

  const triggerChange = (changedValue: any) => {
    onChange?.(changedValue);
  };

  return (

    <Flex gap="small">
    <InputNumber<string>
      style={{ width: 200 }}
      defaultValue="0"
      min="0"
      step="0.01"
      stringMode
      value={value}
      onChange={triggerChange}
    />
  </Flex>

  );
}
