import React, { useState, useRef } from 'react';

import { Select, Input, Button, InputRef, Divider, Space } from 'antd';
import { MoreOutlined, PlusOutlined } from '@ant-design/icons';

require('url-parse');

const { Option } = Select;
const { Search } = Input;

/**
 * The Property Interface for all the Antd Formular-Inputs.
 *
 * @interface Props
 */
interface Props {
  defaultValue?: string;
  options?:any;

  // eslint-disable-next-line react/require-default-props
  value?: string;
  // eslint-disable-next-line react/require-default-props
  onChange?: (value: string) => void;
}

type URL_PREFIX = 'https://' | 'https://';

/**
 * My URL Input-Field
 *
 * @param {Props} { value = '', onChange }
 * @return {*}
 */
function MyInputURLField({ value = '', onChange }: Props) {
  const [inputValue, setInputValue] = useState<string>('');
  const [prefixValue, setPrefixValue] = useState<URL_PREFIX>('https://');

  let val = ''; // value
  let pVal = ''; // prefix Value
  let iVal = ''; // inputValue

  if (value !== undefined) {
    val = value.trim();

    try {
      const urlObj = new URL(val);
      pVal = `${urlObj.protocol}//`;
      iVal = urlObj.host;
    } catch (err) {
      if (val.startsWith('https://')) {
        pVal = 'https://';
        const arr = val.split('//', 2);
        iVal = arr.length > 1 ? arr[1] : '';
      } else if (val.startsWith('http://')) {
        pVal = 'http://';
        const arr = val.split('//', 2);
        iVal = arr.length > 1 ? arr[1] : '';
      } else {
        iVal = val;
      }
    }
  }

  const triggerChange = (changedValue: string) => {
    console.log('changed Value:', changedValue);
    onChange?.(changedValue);
  };

  const handlePrefixChange = (cv: string) => {
    setPrefixValue(cv as URL_PREFIX);
    triggerChange(`${prefixValue}${inputValue}`);
  };

  const handleInputChange = (event: any) => {
    setInputValue(event.target.value);
    triggerChange(`${prefixValue}${inputValue}`);
  };

  const selectBefore = (
    <Select defaultValue="https://" onChange={handlePrefixChange} value={pVal}>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Input
      value={iVal}
      addonBefore={selectBefore}
      onChange={handleInputChange}
      defaultValue="my-website.com"
    />
  );
}

/**
 * My Search Input-Field.
 * 
 * @param {Props} { value = '', onChange }
 * @return {*}
 */
function MySearchField({ value = '', onChange }: Props) {
  const [loading, setLoading] = useState<boolean>(false);

  const triggerChange = (changedValue: string) => {
    onChange?.(changedValue);
  };

  const onSearch = (value: string) => console.log(value);

  const handleInputChange = (value: string) => {
    console.log(`Search Input: ${value}`);
  };

const onSearchMoreClick = () => {
  console.log(`Search More...${value}`);
 };



  // return <div backgro />;
  function getMore() {
    return <div >...</div>;
  }

  return (
    <Search
      addonBefore={<MoreOutlined onClick={onSearchMoreClick} />}
      placeholder="input search text"
      allowClear
      enterButton
      onSearch={onSearch}
      style={{ width: 450 }}
      loading={loading}
    />
  );
}

/**
 * TODO options und defaultValue müssen noch verarbeitet werden (exportForm)
 *
 * @param {Props} { value = '', onChange }
 * @return {*}
 */
function MySelectEditField({ value = '' ,onChange }: Props) {

  // TODO MySelectEditField ist noch unfertig...
  const [items, setItems] = useState(['jack', 'lucy']);
  const [name, setName] = useState('');
  const inputRef = useRef<InputRef>(null);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault();
    setItems([...items, name || `New item`]);
    setName('');
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  return (
    <Select
      style={{ width: 300 }}
      placeholder="custom dropdown render"
      // eslint-disable-next-line react/no-unstable-nested-components
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space style={{ padding: '0 8px 4px' }}>
            <Input
              placeholder="Please enter item"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Add item
            </Button>
          </Space>
        </>
      )}
      options={items.map((item) => ({ label: item, value: item }))}
    />
  );
}

export { MyInputURLField, MySearchField, MySelectEditField };
