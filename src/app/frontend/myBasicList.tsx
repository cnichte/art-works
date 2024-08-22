import React, { useEffect, useState } from "react";
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
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
  BarsOutlined,
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

// TODO CSS import styles from './myBasicList.css';
// <Table className={styles.antTableRow}

type RowSelectionType = "checkbox" | "radio";
type ListType = "list" | "grid";

type RowSelectionCallbackType = (
  // eslint-disable-next-line no-unused-vars
  selectedRowKeys: React.Key[],
  // eslint-disable-next-line no-unused-vars
  selectedRows: Array<any> // TODO ? DataType
) => any;

interface MyBasicList_GridRenderer_Props<T> {
  /**
   * Callback to render an grid item.
   * 
   * @param record 
   * @returns 
   */
  render_grid?: (record: T) => MyCardGridList_DataItem;
}

interface MyBasicListProps<T> extends MyBasicList_GridRenderer_Props<T> {
  modul_props: Modul_Props_I;
  listTypes: ListType[];
  columns: Array<any>;
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
 * @param param0 Properties
 * @returns
 */
function MyBasicList<T>({
  modul_props,
  listTypes,
  columns,
  columns_meta,
  rowSelectionActive = false,
  rowSelectionType = "radio", // checkbox' | 'radio
  rowSelectionCallback = null,
  render_grid,
}: MyBasicListProps<T>) {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const navigate = useNavigate();
  const [data, setData] = useState<T[]>([]);
  //* PopConfirm - delete action
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [listType, setListType] = useState<ListType>("list");

  function getListTypeOptions(): Array<any> {
    let listTypeOptions = [];

    if (listTypes.includes("list")) {
      listTypeOptions.push({
        label: "List",
        value: "list",
        icon:  <BarsOutlined /> ,
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

     List Actions

    ---------------------------------------------------------- */

  useEffect(() => {
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
        if(response.type==="request:show-settings-dialog-action"){
            console.log(`Show Settigs-Dialog for ${modul_props.doctype}_${response.view}`)
        }
      },
    });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  //* open form in mode 'edit'
  const handleEdit = (id: string) => {
    navigate(`/${modul_props.doctype}/form/${id}`);
  };

  //* open form in mode 'new'
  const handleAdd = () => {
    navigate(`/${modul_props.doctype}/form/new`);
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

    // Das item aus der Tabelle entfernen.
    //! Das sollte erst gemacht werden, wenn erfolgreich aus DB entfernt...
    const newData = data.filter((item: any) => item.id !== record.id);
    setData(newData);

    console.info("Request data delete from backend...");
    // window.electronAPI.sendMessage(requests.channel, [ requests.deleteData, record,]);
  };

  const handlePopconfirmCancel = (record: any) => {
    console.log(`Clicked Cancel Button for ${record.id}`);
  };

  const onViewTypeSelectionChange = (e: RadioChangeEvent) => {
    console.log("onViewTypeSelectionChange", e.target.value);
  };

  /* ----------------------------------------------------------

     List Actions: ROW SELECTION Support for Radio and checkbox

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

     Grid Actions

    ---------------------------------------------------------- */

  const cardSizes: Record<PropertyKey, number> = {};
  [
    100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200, 210, 220, 230, 240,
    250, 260, 270, 280, 290, 300, 310, 320, 330, 340, 350,
  ].forEach((v, i) => {
    cardSizes[i] = v;
  });
  const [cardSizesIndex, setCardSizesIndex] = useState<number>(3);
  const formatter = (n: number) => `${n + 1} ${n > 0 ? "Spalten" : "Spalte"}`;

  /* ----------------------------------------------------------

     Tabelle mit den Aktionen
     Die Aktionen werden an die Benutzer-TabellenSpalten angehängt.

     rowKey={(record) => record._id} adds a data-row-key Property to <tr>

    ---------------------------------------------------------- */

  const columnActions: ColumnsType<GroupOfWorkI> = [
    {
      title: "Aktionen",
      key: "action",
      render: (_, record) =>
        data.length >= 1 ? (
          <Space size="middle">
            <Button
              type="primary"
              shape="circle"
              size="middle"
              onClick={() => handleEdit(record.id)}
            >
              <EditOutlined />
            </Button>
            <Popconfirm
              title="Eintrag löschen!"
              description="Bist du ganz sicher?"
              onConfirm={() => handlePopconfirmOk(record)}
              okButtonProps={{ loading: confirmLoading }}
              onCancel={() => handlePopconfirmCancel(record)}
            >
              <Button type="primary" shape="circle" size="middle">
                <DeleteOutlined />
              </Button>
            </Popconfirm>
          </Space>
        ) : null,
    },
  ];

  // Die übergebenen Benutzer-TabellenSpalten vor den Aktionen einfügen.
  const allColumns = columns.concat(columnActions);

  function Render_Table_Or_Grid({ render_grid }: MyBasicList_GridRenderer_Props<T>) {
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
            columns={allColumns}
            dataSource={getContent()}
            rowKey={(record) => record.id}
          />
        </Col>
      );
    } else if (listType == "grid") {
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

  /* ----------------------------------------------------------

     View -  Data gets dynamically adjusted

    ---------------------------------------------------------- */

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
      </Space>
      <Row gutter={[40, 0]}>
        <Render_Table_Or_Grid
          render_grid={function (record: T): MyCardGridList_DataItem {
            if (render_grid) {
              return render_grid(record);
            }
          }}
        />
      </Row>
    </Space>
  );
}

export { MyBasicList, RowSelectionType };
