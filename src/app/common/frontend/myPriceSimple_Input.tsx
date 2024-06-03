import { Flex, InputNumber } from "antd";
import { Props_FormItem } from "./types/FormPropertiesInterface";

export function My_PriceSimple_Input({
  value = '',
  onChange,
}: Props_FormItem<string>): any {

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
