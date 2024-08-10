import { DatePicker, DatePickerProps } from "antd";
import { FormItem_Props } from "../common/types/FormPropertiesInterface";
import { useState } from "react";
import { DateTool } from "./DateTool";

interface MyInputFieldProps extends FormItem_Props<string> {
  defaultValue?: string;
  options?: any;
}

/**
 * Das ist ein Wrapper um DatePicker, da ich ausserhalb nur mit Strings hantiere,
 * der Andt DatePicker aber mit datejs Objekten arbeitet.
 * Hier wird also konvertiert.
 *
 * @param param0
 * @returns
 */
export function MyDatePicker({ value = "", onChange }: MyInputFieldProps) {
  const [inputValue, setInputValue] = useState<string>("");

  const triggerChange = (changedValue: string) => {
    console.log("changed Value:", changedValue);
    onChange?.(changedValue);
  };

  const onDatePickerChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    console.info(date, dateString);
    let nv: string = DateTool.getDateToString(date, "date") as string;

    setInputValue(nv); // triggert das neuzeichnen
    triggerChange(nv);
  };

  return (
    <DatePicker
      value={DateTool.getStringToDate(value, "date")}
      onChange={onDatePickerChange}
      format={DateTool.FORMAT_DATE}
      placeholder={"YYYY-MM-DD"}
    />
  );
}
