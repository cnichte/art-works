/* eslint-disable no-unused-vars */
import { useState } from 'react';

import dayjs from 'dayjs';
import { DatePicker, Radio, RadioChangeEvent, Select, TimePicker } from 'antd';
import {
  DateTool,
  DatePickerType,
  DatePickerMode,
  MyDateValue,
} from './DateTool';

const { RangePicker } = DatePicker;

/* ==========================================================

    * DynamicDatePicker - React Component

   ========================================================== */

/**
 ** DynamicDatePicker: A React Helper Component for MyDatePicker.
 * DynamicDatePicker adapts dynamically depending on type and mode.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @param param0 Parameter Object.
 * @returns React Component, DatePicker or RangePicker.
 */
function DynamicDatePicker({
  value, // string[] with one or two values
  type, //  date, month, year
  mode, // dateMoment, datePeriod
  onChange, // callback
}: {
  value: string[];
  type: DatePickerType;
  mode: DatePickerMode;
  onChange: any; // callback => TimePickerProps['onChange'] | DatePickerProps['onChange']| TimeRangePickerProps['onChange'];
}) {
  // We have to convert
  // the Date-Strings to Dates...
  let internalValue: any = []; // dayjs.Dayjs | dayjs.Dayjs[] = [];

  if (Array.isArray(value)) {
    if (mode === 'dateMoment' && value.length === 2) {
      value.pop();
    }

    if (value.length === 1) {
      internalValue = DateTool.getStringToDate(value[0], type);
    } else if (value.length === 2) {
      internalValue[0] = DateTool.getStringToDate(value[0], type);
      internalValue[1] = DateTool.getStringToDate(value[1], type);
    }
  } // Eigentlich hab ich hier immer ein array

  // Select a Picker-Component
  if (type === 'time' && mode === 'dateMoment')
    return <TimePicker onChange={onChange} />;
  if (type === 'date' && mode === 'dateMoment')
    return (
      <DatePicker
        value={internalValue}
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
      />
    );
  if (type === 'month' && mode === 'dateMoment')
    return (
      <DatePicker
        value={internalValue}
        picker={type}
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
      />
    );
  if (type === 'year' && mode === 'dateMoment')
    return (
      <DatePicker
        value={internalValue}
        picker={type}
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
      />
    );

  if (type === 'time' && mode === 'datePeriod')
    return (
      <RangePicker
        value={internalValue}
        showTime
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
      />
    );
  if (type === 'date' && mode === 'datePeriod')
    return (
      <RangePicker
        value={internalValue}
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
      />
    );
  if (type === 'month' && mode === 'datePeriod')
    return (
      <RangePicker
        value={internalValue}
        picker={type}
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
      />
    );
  if (type === 'year' && mode === 'datePeriod')
    return (
      <RangePicker
        value={internalValue}
        picker={type}
        onChange={onChange}
        format={DateTool.getFormatFromType(type)}
        // defaultValue={[dayjs(new Date(), DateTool.getFormatFromType(type)), dayjs(new Date(), DateTool.getFormatFromType(type)),]}
      />
    );
  return (
    <DatePicker
      value={internalValue}
      picker={type}
      onChange={onChange}
      format={DateTool.getFormatFromType(type)}
    />
  );
}

/* ==========================================================

    * MyDatePickerInput - ReactNode / Main Component.

   ========================================================== */

/**
 * The React-Property Definition of MyDatePickerInput React-Component.
 * 'value' and 'onChange' must necessarily be called exactly that,
 * because they are used by the parent Andt Form.Item.
 * Dont rename them.
 *
 * @interface Props
 */
interface Props {
  // eslint-disable-next-line react/require-default-props
  value?: MyDateValue;
  // eslint-disable-next-line react/require-default-props
  onChange?: (value: MyDateValue) => void;
}

/**
 ** My special Date-Picker consists of three Components:
 *
 * Mode: Point in Time | Period
 * Type: date, month, year (time?)
 * Date: The Date-Value
 *
 * Format: The Format to display the Date.
 *
 * https://ant.design/components/form#components-form-demo-customized-form-controls.
 *
 * TODO Wenn ich den Mode umschalte, geht natürlich ein Wert verloren.
 * Eim modeBuffer - könnte immer beide Werte vorhalten?
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @param param0
 * @returns
 */
function MyDatePickerInput({ value = {}, onChange }: Props): any {
  // console.log('MyDatePicker - value', value);

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const [date, setDate] = useState<Array<string>>([]);
  const [dateType, setDateType] = useState<DatePickerType>('date');
  const [dateMode, setDateMode] = useState<DatePickerMode>('dateMoment');

  /* ----------------------------------------------------------

    Actions

    ---------------------------------------------------------- */

  const triggerChange = (changedValue: MyDateValue) => {
    // https://www.mediaevent.de/javascript/spread-operator.html
    // mixe das geänderte Objekt zusammen...
    // TODO kann man das auch noch aufräumen?
    onChange?.({ date, dateType, dateMode, ...value, ...changedValue });
  };

  const onDateModeEvent = (e: RadioChangeEvent) => {
    const { target } = e; //* type guard

    const newValue = target.value as DatePickerMode;

    if (!('dateMode' in value)) {
      setDateMode(newValue);
    }

    triggerChange({ dateMode: newValue });
  };

  const onDateTypeEvent = (newValue: DatePickerType) => {
    if (!('dateType' in value)) {
      setDateType(newValue);
    }
    // Date format depends on dateType
    const newDateFormat = DateTool.getFormatFromType(newValue);

    triggerChange({ dateType: newValue, dateFormat: newDateFormat });
  };

  /* ----------------------------------------------------------

     View -  Data gets dynamically adjusted

    ---------------------------------------------------------- */
  // style={{ display: 'inline-block', width: 'calc(30% - 1px)', margin: '0 1px',}}
  // margin: top right bottom left | top right+left bottom
  return (
    <div style={{ display: 'flex' }}>
      <Radio.Group
        value={value.dateMode || dateMode}
        defaultValue="dateMoment"
        buttonStyle="solid"
        style={{ width: '195px' }}
        onChange={onDateModeEvent}
      >
        <Radio.Button value="dateMoment">Zeitpunkt</Radio.Button>
        <Radio.Button value="datePeriod">Zeitraum</Radio.Button>
      </Radio.Group>
      <Select
        value={value.dateType || dateType}
        defaultValue="date"
        onChange={onDateTypeEvent}
        options={[
          { value: 'date', label: 'Jahr-Monat-Tag' },
          { value: 'month', label: 'Jahr-Monat' },
          { value: 'year', label: 'Jahr' },
        ]}
        style={{
          width: '150px',
          margin: '0 10px 0 0',
        }}
      />

      <DynamicDatePicker
        value={value.date || date}
        type={value.dateType || dateType}
        mode={value.dateMode || dateMode}
        onChange={(pickerValue: any) => {
          // The picker returns a Date-Object
          // or an array with Date-Objects...
          // console.log('##### MyDatePicker: pickerValue...', pickerValue);

          const newValue: any[] = []; // string[] = [] 

          // I always save the date in full format ('date' = 'YYYY-MM-DD').
          // Otherwise the picker cannot be switched because it lacks date information.
          // '2020' cannot logically be converted to 'YYYY-MM-DD
          // because information on month and day is missing.
          if (Array.isArray(pickerValue)) {
            newValue[0] = DateTool.getDateToString(pickerValue[0], 'date');
            newValue[1] = DateTool.getDateToString(pickerValue[1], 'date');
          } else {
            newValue[0] = DateTool.getDateToString(pickerValue, 'date');
          }

          if (!('date' in value)) {
            setDate(newValue);
          }

          triggerChange({ date: newValue });
        }}
      />
    </div>
  );
}

export default MyDatePickerInput;
