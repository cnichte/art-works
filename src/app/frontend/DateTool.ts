import dayjs from 'dayjs';
// https://day.js.org/docs/en/parse/now

// https://www.typescriptlang.org/docs/handbook/2/objects.html
type DatePickerType = 'time' | 'date' | 'month' | 'year';
type DatePickerMode = 'dateMoment' | 'datePeriod';
type DatePickerFormat = 'YYYY-MM-DD' | 'MM-DD' | 'YYYY-MM' | 'YYYY';

/**
 * TODO Den Typ MyDateValue-Interface ins Backend auslagern.
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @interface MyDateValue
 */
interface MyDateValue {
  dateMode?: DatePickerMode;
  dateType?: DatePickerType;
  dateFormat?: DatePickerFormat;
  date?: Array<string>;
}

/**
 *
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @class DateTool
 */
class DateTool {
  static FORMAT_DATE: DatePickerFormat = 'YYYY-MM-DD';

  static FORMAT_WEEK: DatePickerFormat = 'MM-DD';

  static FORMAT_MONTH: DatePickerFormat = 'YYYY-MM';

  static FORMAT_YEAR: DatePickerFormat = 'YYYY';

  /**
   * Make a date out of the string.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param date as string
   * @param dateType DatePickerType
   * @returns Date | array<Date>
   */
  public static getStringToDate(
    date: string | Array<string>,
    dateType: DatePickerType
  ): dayjs.Dayjs | dayjs.Dayjs[] {
    if (Array.isArray(date) && date.length === 1) {
      const d: any[] = [];

      if (dateType === 'month') {
        d[0] = dayjs(date[0], DateTool.FORMAT_MONTH);
      } else if (dateType === 'year') {
        d[0] = dayjs(date[0], DateTool.FORMAT_YEAR);
      } else {
        d[0] = dayjs(date[0], DateTool.FORMAT_DATE);
      }

      return d;
    }

    if (Array.isArray(date) && date.length === 2) {
      const d: any[] = [];

      if (dateType === 'month') {
        d[0] = dayjs(date[0], DateTool.FORMAT_MONTH);
        d[1] = dayjs(date[1], DateTool.FORMAT_MONTH);
      } else if (dateType === 'year') {
        d[0] = dayjs(date[0], DateTool.FORMAT_YEAR);
        d[1] = dayjs(date[1], DateTool.FORMAT_YEAR);
      } else {
        d[0] = dayjs(date[0], DateTool.FORMAT_DATE);
        d[1] = dayjs(date[1], DateTool.FORMAT_DATE);
      }

      return d;
    }

    return dayjs(date.toString()); // TODO String als Parameter ist noch nicht gut gelöst. siehe MyDatePicker
  }

  /**
   * Make a string out of the date.
   * TODO: Sollte auch ein Array verarbeiten, und zurückgeben können.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param date as Date
   * @param dateType DatePickerType
   * @returns  string | array<string>
   */
  public static getDateToString(
    date: Date |  dayjs.Dayjs,
    dateType: DatePickerType
  ): string | string[] {
    if (Array.isArray(date) && date.length === 1) {
      const d: string[] = [];

      if (dateType === 'month') {
        d[0] = dayjs(date[0]).format(DateTool.FORMAT_MONTH);
      } else if (dateType === 'year') {
        d[0] = dayjs(date[0]).format(DateTool.FORMAT_YEAR);
      } else {
        d[0] = dayjs(date[0]).format(DateTool.FORMAT_DATE);
      }

      return d;
    }

    if (Array.isArray(date) && date.length === 2) {
      const d: any[] = [];

      if (dateType === 'month') {
        d[0] = dayjs(date[0]).format(DateTool.FORMAT_MONTH);
        d[1] = dayjs(date[1]).format(DateTool.FORMAT_MONTH);
      } else if (dateType === 'year') {
        d[0] = dayjs(date[0]).format(DateTool.FORMAT_YEAR);
        d[1] = dayjs(date[1]).format(DateTool.FORMAT_YEAR);
      } else {
        d[0] = dayjs(date[0]).format(DateTool.FORMAT_DATE);
        d[1] = dayjs(date[1]).format(DateTool.FORMAT_DATE);
      }

      return d;
    }

    return dayjs(date).format(DateTool.FORMAT_DATE);
  }

  /**
   * Gets The Format from the correponding Type.
   *
   * @author Carsten Nichte - //carsten-nichte.de/apps/
   * @param dateType DatePickerType
   * @returns DatePickerFormat
   */
  public static getFormatFromType(dateType: DatePickerType): DatePickerFormat {
    if (dateType === 'month') {
      return DateTool.FORMAT_MONTH;
    }
    if (dateType === 'year') {
      return DateTool.FORMAT_YEAR;
    }
    return DateTool.FORMAT_DATE;
  }
}

export {
  DateTool,
  DatePickerType,
  DatePickerMode,
  DatePickerFormat,
  MyDateValue,
};

/*
https://codesandbox.io/s/ngsv5v?file=/demo.tsx:1314-1421

const dateFormat = 'YYYY-MM-DD';
const weekFormat = 'MM-DD';
const monthFormat = 'YYYY-MM';
const yearFormat = 'YYYY';

Manually entering any of the following formats will perform date parsing
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY', 'DD-MM-YYYY', 'DD-MM-YY'];

const customWeekStartEndFormat: DatePickerProps['format'] = (value) =>
  `${dayjs(value).startOf('week').format(weekFormat)} ~ ${dayjs(value)
    .endOf('week')
    .format(weekFormat)}`;
*/
