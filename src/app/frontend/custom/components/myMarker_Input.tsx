import { useState } from "react";
import { Flex, Rate, Switch } from "antd";
import { FlagFilled, FlagOutlined } from "@ant-design/icons";

import { generate, green, presetPalettes, red } from "@ant-design/colors";
import { ColorPicker, theme } from "antd";
import type { ColorPickerProps, GetProp } from "antd";
import { Tagging_Props } from "../../../common/custom/types/Tagging_Types";
import { FormItem_Props } from "../../../common/framework/types/system/FormPropertiesInterface";

type Color = GetProp<ColorPickerProps, "value">;
type Presets = Required<ColorPickerProps>["presets"][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
  }));


/**
 ** Markierungen für ein Dokument.
 *
 * - Rating - funktioniert
 * - Color - funktioniert
 * - Flag - funktioniert
 * 
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 * 
 * @param param0
 * @returns
 */
export function My_Marker_Input({
  value,
  onChange,
}: FormItem_Props<Tagging_Props>): any {

  const [rating, setRating] = useState<number>(value?.rating);
  const [flag, setFlag] = useState<boolean>(value?.flag);
  const [color, setColor] = useState<string>(value?.color);

  // TODO Aus den Settings laden.
  const rating_desc = [
    "gut",
    "sehr gut",
    "sehrsehr gut",
    "herausragend",
    "außergewöhnlich",
  ];

  const { token } = theme.useToken();
  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
  });

  const triggerChange = (changedValue: { rating?: number; color?: string; flag?:boolean }) => {
    onChange?.({ rating, color, flag, ...value, ...changedValue }); //* Beachte: spread operator / spread syntax
  };

  const onRatingChange = (changedValue: number) => {
    if (!('rating' in value)) {
      setRating(changedValue);
    }
    triggerChange({ rating: changedValue });
  };

  const onColorChange = (changedColor: Color, changedHex: string) => {
    if (!('color' in value)) {
      setColor(changedHex);
    }
    triggerChange({ color: changedHex });
  };

  const onFlagChange = (changedValue: boolean) => {
    if (!('flag' in value)) {
      setFlag(changedValue);
    }
    triggerChange({ flag: changedValue });
  };

  return (
    <>
      <Flex wrap gap="middle" align="center">
        <Rate
          allowClear={true}
          tooltips={rating_desc}
          onChange={onRatingChange}
          value={value?.rating || rating}
        />

        <ColorPicker
          defaultFormat="hex"
          format="hex"
          allowClear
          presets={presets}
          value={value?.color || color}
          onChange={onColorChange}
        />
        <Switch
          checkedChildren={<FlagFilled />}
          unCheckedChildren={<FlagOutlined />}
          defaultChecked
          value={value?.flag || flag}
          onChange={onFlagChange}
        />
      </Flex>
    </>
  );
}
