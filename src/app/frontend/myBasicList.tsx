import React, { useEffect, useRef, useState } from "react";
import {
  Space,
  Popconfirm,
  Table,
  Row,
  Col,
  Button,
  RadioChangeEvent,
  Segmented,
  Slider,
  Tooltip,
  InputRef,
  TableColumnType,
  Input,
  Typography,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
  BarsOutlined,
  FilterOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import RelationResolver from "./RelationResolver";
import { MyBasicList_Meta_I } from "../common/types/MyBasicListTypes";
import { GroupOfWorkI } from "../common/types/DocGroupOfWork";
import { Action_Request, DB_Request } from "../common/types/RequestTypes";
import { RequestData_IPC } from "./RequestData_IPC";
import { Modul_Props_I } from "../common/Modul_Props";

import { MyCardGridList, MyCardGridList_DataItem } from "./myCardGridList";

import {
  MyBasicList_SearchPanel,
  MyBasicList_SearchPanel_Buttons,
  SearchPanelType,
} from "./myBasicList_SearchPanel";
import Highlighter from "react-highlight-words";
import { FilterDropdownProps } from "antd/es/table/interface";
import { DocItentifiable } from "../common/types/DocType";
import { MyBasicList_ColumnSearchInput } from "./myBasicList_ColumnSearchInput";

export type DataIndex<T> = keyof T; // Das sind die Property-Namen von T
//! https://www.typescriptlang.org/docs/handbook/2/keyof-types.html
//! https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-9.html#:~:text=Given%20an%20object%20type%20X,representing%20symbol%2Dlike%20properties%2C%20otherwise
//! https://www.typescriptlang.org/docs/handbook/2/generics.html#using-type-parameters-in-generic-constraints

// TODO CSS import styles from './myBasicList.css';
// <Table className={styles.antTableRow}

export type RowSelectionType = "checkbox" | "radio";
export type ListType = "list" | "grid";

export type RowSelectionCallbackType = (
  // eslint-disable-next-line no-unused-vars
  selectedRowKeys: React.Key[],
  // eslint-disable-next-line no-unused-vars
  selectedRows: Array<any> // TODO ? DataType
) => any;

export interface MyBasicList_GridRenderer_Props<T> {
  /**
   * Callback to render an grid item.
   * Es wird nicht wirklich gerendert,
   * sondern Daten / Properties zugeordnet.
   * map_record_callback
   */
  map_record_callback?: (record: T) => MyCardGridList_DataItem;
}
export interface MyBasicListProps<T> extends MyBasicList_GridRenderer_Props<T> {
  modul_props: Modul_Props_I;
  listTypes: ListType[];
  columns: Array<any>; // TODO Array<ColumnsType<T>>
  // Columns-Filter
  columns_search_exclude?: Array<string>; // columns (dataIndex) to exclude from decoration with search
  // additional Column-Features
  columns_as_link?: Array<string>;
  columns_as_ellipsis?: Array<string>;

  columns_meta?: MyBasicList_Meta_I[];
  rowSelectionActive?: boolean;
  rowSelectionType?: RowSelectionType; // TODO Type checkbox' | 'radio
  rowSelectionCallback?: RowSelectionCallbackType | null;
}

// TODO Extra Action Buttons (Fall 2) wie im <Drawer />: https://codesandbox.io/s/fzllmh?file=/demo.tsx
// Fall 1: extra:Button:ReactElement<ButtonProps>; ->   {extrabutton}  -> Action wird nicht ausgeführt
//* Fall 2: ExtraButton: ComponentType<ButtonProps>; -> <ExtraButton /> -> Action wird nicht ausgeführt
// Fall 3: extraButton: () => ReactElement<ButtonProps>; ->  const ebtn = extraButton();  --> {ebtn}

/**
 ** MyBasicList - React Component.
 *
 * Liste, und List Funktionen sind für alle Module gleich.
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @version 1.0.0
 *
 * @param param0 Properties
 * @returns
 */
export function MyBasicList<T extends DocItentifiable>({
  // Generic with Constrait
  modul_props,
  listTypes,

  columns,
  columns_meta,
  columns_search_exclude,
  columns_as_link,
  columns_as_ellipsis,

  rowSelectionActive = false,
  rowSelectionType = "radio", // checkbox' | 'radio
  rowSelectionCallback = null,
  map_record_callback: render_grid,
}: MyBasicListProps<T>) {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const navigate = useNavigate();
  const [data, setData] = useState<T[]>([]);
  //* PopConfirm - delete action
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [listType, setListType] = useState<ListType>("list");

  const [showSearchPanel, setShowSearchPanel] = useState<boolean>(false);
  const [searchPanelType, setSearchPanelType] =
    useState<SearchPanelType>("text");

  /* ----------------------------------------------------------

     React Hook

    ---------------------------------------------------------- */

  useEffect(() => {
    // Beim laden der Seite...
    const request: DB_Request = {
      type: "request:list-all",
      doctype: modul_props.doctype,
      id: "",
      options: {},
    };

    const buaUnsubscribe_func = RequestData_IPC.init_and_load_data<T[]>({
      viewtype: "list",
      modul_props: modul_props,

      request: request,
      ipc_channel: "ipc-database",

      surpress_buttons: false,
      setDataCallback: function (result: T[]): void {
        setData(result);
      },
      doButtonActionCallback: function (response: Action_Request): void {
        if (response.type === "request:show-settings-dialog-action") {
          console.log(
            `Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`
          );
        }
      },
    });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  /* ----------------------------------------------------------

   * callbacks

   ---------------------------------------------------------- */

  //* open form in mode 'edit'
  const handleEdit = (id: string) => {
    navigate(`/${modul_props.doctype}/form/${id}`);
  };

  const handleView = (record: T) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const handleSearch = () => {
    console.log("handleSearch in BasicView");
  };

  const handleExtra = () => {
    console.log("handleExtra in BasicView");
  };

  //* popconfirm - delete action
  const handlePopconfirmOk = (record: any) => {
    console.log(`Clicked Okay Button for ${record.id}`);
    setConfirmLoading(true); // Umbenennen: Loading Animation

    const request: DB_Request = {
      type: "request:delete",
      doctype: modul_props.doctype,
      id: record.id,
      options: {},
    };

    RequestData_IPC.load_data<any>({
      // TODO load_data ist hier irreführend.
      modul_props: modul_props,
      ipc_channel: "ipc-database",
      request: request,
      setDataCallback: function (result: any): void {
        // Das item aus der Tabelle entfernen.

        // let test:any =  data[modul_props.segment];
        //TODO Das Element weist implizit einen Typ "any" auf, weil der Indexausdruck nicht vom Typ "number" ist.ts(7015)
        // https://stackoverflow.com/questions/57438198/typescript-element-implicitly-has-an-any-type-because-expression-of-type-st
        // Medium: https://typescriptcenter.com/demystifying-typescript-resolving-the-element-implicitly-has-an-any-type-error-a8ab4d948879
        // -> obsidian://open?vault=carsten-nichte-projekte&file=Software%20Projekte%2FResolving%20the%20%E2%80%9CElement%20implicitly%20has%20an%20%E2%80%98any%E2%80%99%20type%E2%80%9D%20Error
        // const key: SegmentType = "addresses";
        // console.log(data[key as keyof typeof data]);

        //! Das ist ein Hack des Problems:
        let records: any = [];
        records = data[modul_props.segment as any];

        const newData = records.filter((item: any) => item.id !== record.id);
        setData(newData);

        console.info("Request data delete from backend...");
      },
    });
  };

  const handlePopconfirmCancel = (record: any) => {
    console.log(`Clicked Cancel Button for ${record.id}`);
  };

  const onViewTypeSelectionChange = (e: RadioChangeEvent) => {
    console.log("onViewTypeSelectionChange", e.target.value);
  };

  /* ----------------------------------------------------------
     * List Actions: ROW SELECTION Support for Radio and checkbox
     TODO Funktioniert das, nutze ich das (in Catalog-Module nicht)?
    ---------------------------------------------------------- */

  const [doRowSelection, setdoRowSelection] = useState(rowSelectionActive);
  const [selectionType, setSelectionType] =
    useState<RowSelectionType>(rowSelectionType);

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      // console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      if (rowSelectionCallback != null) {
        rowSelectionCallback(selectedRowKeys, selectedRows);
      }
    },
    getCheckboxProps: (record: any) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  function getContent(): Array<any> {
    let records: any = [];

    if (modul_props.segment in data) {
      records = data[modul_props.segment as any];

      if (columns_meta != null) {
        // resolve some uuids
        for (let i = 0; i < records.length; i += 1) {
          if (columns_meta != null) {
            for (let j = 0; j < columns_meta.length; j += 1) {
              let value = records[i][columns_meta[j].dataIndex];
              if (RelationResolver.uuidValidateV4(value)) {
                value = RelationResolver.resolve(data, columns_meta[j], value);
                records[i][columns_meta[j].dataIndex] = value;
              }
            }
          }
        }
      } else {
        records = data[modul_props.segment as any];
      }
    }

    return records;
  }

  /* ----------------------------------------------------------

     * Button-Bar Options

    ---------------------------------------------------------- */

  const cardSizes: Record<PropertyKey, number> = {};
  [
    100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240,
    250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350, 360, 370, 380, 390,
  ].forEach((v, i) => {
    cardSizes[i] = v;
  });
  const [cardSizesIndex, setCardSizesIndex] = useState<number>(3);
  const formatter = (n: number) => `${n + 1} ${n > 0 ? "Spalten" : "Spalte"}`;

  function getListTypeOptions(): Array<any> {
    let listTypeOptions = [];

    if (listTypes.includes("list")) {
      listTypeOptions.push({
        label: "List",
        value: "list",
        icon: <BarsOutlined />,
      });
    }

    if (listTypes.includes("grid")) {
      listTypeOptions.push({
        label: "Grid",
        value: "grid",
        icon: <AppstoreOutlined />,
      });
    }

    return listTypeOptions;
  }

  /* ----------------------------------------------------------

    * Row-Actions
     rowKey={(record) => record._id} adds a data-row-key Property to <tr>

    ---------------------------------------------------------- */

  const doShowSearchPanel = () => {
    setShowSearchPanel(!showSearchPanel);
  };

  const column_actions: ColumnsType<GroupOfWorkI> = [
    {
      title: "Aktionen",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            shape="circle"
            size="middle"
            onClick={() => handleEdit(record.id)}
          >
            <Tooltip placement="left" title="Eintrag bearbeiten">
              <EditOutlined />
            </Tooltip>
          </Button>
          <Popconfirm
            title="Eintrag löschen!"
            description="Bist du ganz sicher?"
            onConfirm={() => handlePopconfirmOk(record)}
            okButtonProps={{ loading: confirmLoading }}
            onCancel={() => handlePopconfirmCancel(record)}
          >
            <Button
              type="default"
              shape="circle"
              size="middle"
              style={{ color: "red" }}
            >
              <Tooltip placement="right" title="Eintrag löschen">
                <DeleteOutlined />
              </Tooltip>
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  /* ----------------------------------------------------------

     * Columns preparation

    ---------------------------------------------------------- */

  //* Columns-Filter
  //! Spalten-Filter für alle Spalten.
  //! https://ant.design/components/table#table-demo-custom-filter-panel

  // TODO Überschreibt noch die custom renderer
  const [searchText, setSearchText] = useState<string>("");
  const [searchedColumn, setSearchedColumn] = useState<DataIndex<T>>();
  const searchInput = useRef<InputRef>(null);

  const getColumnSearchProps = (
    dataIndex: DataIndex<T>
  ): TableColumnType<T> => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <MyBasicList_ColumnSearchInput
        dataIndex={dataIndex}
        setSelectedKeys={setSelectedKeys}
        selectedKeys={selectedKeys}
        confirm={confirm}
        clearFilters={clearFilters}
        close={close}
        // callbacks
      />
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value: any, record: any) => {
      const test = record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());

      console.log("Column-Filter - value: ", value);
      console.log("Column-Filter - record: ", record);
      console.log("Column-Filter - dataIndex: ", dataIndex);
      console.log("Column-Filter - test:", test);
      console.log("------------------------------------------");
      return test;
    },
    onFilterDropdownOpenChange: (visible: boolean) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text, record, index) => {
      let to_render = text;
      let highlighted_text = text;

      if (searchedColumn === dataIndex) {
        highlighted_text = (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text}
          />
        );
      }

      to_render = highlighted_text;

      if (columns_as_link?.includes(dataIndex as string)) {
        to_render = (
          <a onClick={() => handleView(record)}> {highlighted_text} </a>
        );
      }

      // TODO ellipsis funktioniert noch nicht
      // /*
      if (columns_as_ellipsis?.includes(dataIndex as string)) {
        to_render = (
          <Typography.Paragraph
            ellipsis={{
              rows: 3,
              expandable: "collapsible",
            }}
          >
            {to_render}
          </Typography.Paragraph>
        );
      }
      // */
      return to_render;
    },
  });

  //! Alle Spalten werden mit dem Columns-Filter aussgestattet.
  // TODO das funktioniert noch nicht.
  let decorated_columns = columns.map((col) => {
    if (
      columns_search_exclude == null ||
      !columns_search_exclude.includes(col.dataIndex)
    ) {
      return {
        ...col,
        ...getColumnSearchProps(col.dataIndex),
      };
    }
  });

  //! Die Row-Actions werden hinten angefügt.
 // const all_columns = columns;
  const all_columns = columns.concat(column_actions); //! columns
 // const all_columns = decorated_columns.concat(column_actions); //! columns


  /**
   ** Button-Bar:List|Grid, Grid-Adjuster, Suche,
   ** Tabelle oder Masonry-Grid rendern.
   *
   * @param param0
   * @returns
   */
  function Render_Table_Or_Grid({
    map_record_callback: render_grid,
  }: MyBasicList_GridRenderer_Props<T>) {
    if (listType == "list") {
      return (
        <Col span={24}>
          <Table
            rowSelection={
              doRowSelection
                ? {
                    type: selectionType,
                    ...rowSelection,
                  }
                : null
            }
            columns={all_columns}
            dataSource={getContent()}
            rowKey={(record) => record.id}
          />
        </Col>
      );
    }  else if (listType == "grid") {
      // TODO Render a Grid of Cards

      let records: any = [];
      records = data[modul_props.segment as any];

      return (
        <MyCardGridList<T>
          modul_props={modul_props}
          data={records}
          cardSize={cardSizes[cardSizesIndex]}
          render={function (r: T): MyCardGridList_DataItem {
            if (render_grid) {
              return render_grid(r);
            }
          }}
        />
      );
    }
  }

  return (
    <Space
      direction="vertical"
      size="middle"
      style={{
        display: "flex",
      }}
    >
      <Space wrap>
        {listTypes.length > 1 ? (
          <Segmented<string>
            options={getListTypeOptions()}
            defaultValue="list"
            onChange={(value) => {
              setListType(value as ListType);
            }}
          />
        ) : null}

        {listType == "grid" ? (
          <Slider
            min={0}
            max={Object.keys(cardSizes).length - 1}
            value={cardSizesIndex}
            onChange={setCardSizesIndex}
            style={{ width: 80 }}
            // TODO tooltip={{ formatter }}
          />
        ) : null}
        <Button
          type={showSearchPanel ? "primary" : "default"}
          icon={<SearchOutlined />}
          onClick={(e) => {
            doShowSearchPanel();
          }}
        />
        <MyBasicList_SearchPanel_Buttons<T>
          show={showSearchPanel}
          onChange={function (value: SearchPanelType): void {
            setSearchPanelType(value);
          }}
        />
      </Space>
      <MyBasicList_SearchPanel<T>
        modul_props={modul_props}
        show={showSearchPanel}
        searchPanelType={searchPanelType}
      />
      <Row gutter={[40, 0]}>
        <Render_Table_Or_Grid
          map_record_callback={function (record: T): MyCardGridList_DataItem {
            if (render_grid) {
              return render_grid(record);
            }
          }}
        />
      </Row>
    </Space>
  );
}
