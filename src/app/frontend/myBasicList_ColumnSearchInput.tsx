import { useRef, useState } from "react";
import { DocItentifiable } from "../common/types/DocType";
import { Button, Input, InputRef, Space } from "antd";
import { FilterDropdownProps } from "antd/es/table/interface";

import { SearchOutlined } from "@ant-design/icons";
import { DataIndex } from "./myBasicList";

export interface MyBasicList_ColumnSearchInput_Props<T> {
  dataIndex: DataIndex<T>;
  setSelectedKeys: any;
  selectedKeys: any;
  confirm: any;
  clearFilters: any;
  close: any;
}

export function MyBasicList_ColumnSearchInput<T extends DocItentifiable>({
  dataIndex,
  setSelectedKeys,
  selectedKeys,
  confirm,
  clearFilters, // Callback
  close, // Callback
}: MyBasicList_ColumnSearchInput_Props<T>) {
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex<T>>();
  const searchInput = useRef<InputRef>(null);
  // TODO Für alle drei Callbacks zum parent...

  const handleSearch = (
    selectedKeys: string[],
    confirm: FilterDropdownProps["confirm"],
    dataIndex: DataIndex<T>
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText("");
  };

  return (
    <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
      <Input
        ref={searchInput}
        placeholder={`Search ${String(dataIndex)}`}
        value={selectedKeys[0]}
        onChange={(e) =>
          setSelectedKeys(e.target.value ? [e.target.value] : [])
        }
        onPressEnter={() =>
          handleSearch(selectedKeys as string[], confirm, dataIndex)
        }
        style={{ marginBottom: 8, display: "block" }}
      />
      <Space>
        <Button
          type="primary"
          onClick={() =>
            handleSearch(selectedKeys as string[], confirm, dataIndex)
          }
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90 }}
        >
          Search
        </Button>
        <Button
          onClick={() => clearFilters && handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            confirm({ closeDropdown: false });
            setSearchText((selectedKeys as string[])[0]);
            setSearchedColumn(dataIndex);
          }}
        >
          Filter
        </Button>
        <Button
          type="link"
          size="small"
          onClick={() => {
            close();
          }}
        >
          close
        </Button>
      </Space>
    </div>
  );
}
