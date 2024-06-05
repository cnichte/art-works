import React, { useEffect, useState } from "react";
import {
  Space,
  Popconfirm,
  Table,
  Row,
  Col,
  Button,
  message,
  Radio,
  RadioChangeEvent,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  SearchOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { RequestsListI } from "../backend/types/RequestsFactoryTypes";
import { MySearchField } from "./myInputFields";
import { GroupOfWorkI } from "../../modules/groupofwork/types/GroupOfWorkInterface";
import RelationResolver from "./RelationResolver";
import { MyBasicList_Meta_I } from "./types/MyBasicListTypes";

// TODO CSS import styles from './myBasicList.css';
// <Table className={styles.antTableRow}

type RowSelectionType = "checkbox" | "radio";
type ViewType = "list" | "grid";

type RowSelectionCallbackType = (
  // eslint-disable-next-line no-unused-vars
  selectedRowKeys: React.Key[],
  // eslint-disable-next-line no-unused-vars
  selectedRows: Array<any> // TODO ? DataType
) => any;

interface MyBasicListProps {
  moduleLabel: string;
  moduleId: string;
  requests: RequestsListI;
  segment: string;
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
function MyBasicList({
  moduleLabel,
  moduleId,
  requests,
  segment,
  columns,
  columns_meta,
  rowSelectionActive = false,
  rowSelectionType = "radio", // checkbox' | 'radio
  rowSelectionCallback = null,
}: MyBasicListProps) {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const navigate = useNavigate();
  const [data, setData] = useState<any>([]);
  //* PopConfirm - delete action
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [viewType, setViewType] = useState<ViewType>("list");

  /* ----------------------------------------------------------

     List Actions

    ---------------------------------------------------------- */

  useEffect(() => {
    //* Fordere Daten vom Backend, an.
    // console.log( `Fordere Daten vom Backend an: ${requests.channel}, ${requests.listData}.`);
    window.my_app_api.ipc.sendMessage(requests.channel, [requests.listData]);
  }, []);

  //* Erhalte die Daten vom Backend.
  window.my_app_api.ipc.once(requests.channel, (arg: any) => {
    console.log(arg);
    if (arg.request === requests.listData) {
      if ("error" in arg) {
        if ("error" in arg.error && "reason" in arg.error) {
          let m =
            `Fehler: ${arg.error.error}` +
            (arg.error.reason.length > 0 ? `, Grund: ${arg.error.reason}` : "");
          message.error(m);
        } else {
          message.error(`Fehler: ${arg.error.toString()}`);
        }
      } else {
        console.log(arg.data);
        setData(arg.data); // arg.data.docs
      }
    } else if (arg.request === requests.deleteData) {
      setConfirmLoading(false);
      if ("error" in arg) {
        // object with keys {error, reason, status, name, message, stack, docId}).
        message.error(`Fehler: ${arg.error.error}, Grund: ${arg.error.reason}`);
      } else if ("deleted" in arg.data && arg.data.deleted) {
        // data:{ deleted: true }
        message.success("Daten erfolgreich gelöscht.");
      } else if ("deleted" in arg.data && !arg.data.deleted) {
        // data:{ deleted: false }
        message.warning("Daten konnten nicht gelöscht werden.");
      }
    }
  });

  //* open form in mode 'edit'
  const handleEdit = (id: string) => {
    navigate(`/${moduleId}/form/${id}`);
  };

  //* open form in mode 'new'
  const handleAdd = () => {
    navigate(`/${moduleId}/form/new`);
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
    window.my_app_api.ipc.sendMessage(requests.channel, [
      requests.deleteData,
      record,
    ]);
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

    if (segment in data) {
      records = data[segment];

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
        records = data[segment];
      }
    }

    return records;
  }

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
        <Button onClick={handleAdd}>
          <PlusOutlined /> {moduleLabel} hinzufügen
        </Button>
        <Radio.Group
          defaultValue={viewType}
          buttonStyle="solid"
          onChange={onViewTypeSelectionChange}
        >
          <Radio.Button value="list">
            <UnorderedListOutlined />
          </Radio.Button>
          <Radio.Button value="grid">
            <AppstoreOutlined />
          </Radio.Button>
        </Radio.Group>
        <MySearchField onChange={handleSearch} />
        <Button>
          <SettingOutlined />
        </Button>
      </Space>
      <Row gutter={[40, 0]}>
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
      </Row>
    </Space>
  );
}

export { MyBasicList, RowSelectionType };
