import React, { Key, useEffect, useState } from "react";
import { useNavigate } from "react-router";

import { Select, Space, Table, Popconfirm, Tabs, Button, Tooltip } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  FileZipOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";

import type { ColumnsType } from "antd/es/table";
import type { TableRowSelection } from "antd/es/table/interface";
import { App_Messages_IPC } from "../../../frontend/tools/App_Messages_IPC";
import { RequestData_IPC } from "../../../frontend/tools/RequestData_IPC";
import { modul_props } from "../modul_props";
import ExportForm from "./exportForm";
import { DocCatalogType } from "../../../common/framework/types/documents/DocCatalog";
import { IPC_SETTINGS } from "../../../common/framework/types/system/IPC_Channels";
import {
  Settings_Request,
  Action_Request,
  DB_Request,
} from "../../../common/framework/types/system/RequestTypes";

export function Catalog_List() {
  const navigate = useNavigate();

  const [startoptions, setStartoptions] = useState([]);
  const [selectedStartoption, setSelectedStartoption] = useState<string>("");
  const [selectedShowCatalogChooser, setSelectedShowCatalogChooser] =
    useState<boolean>(false);
  const [selectedCatalog, setSelectedCatalog] = useState<string>("");

  const [tabledata, setTableData] = useState<DataType[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    // Beim laden der Seite...
    // Request data from pouchdb on page load.
    //! Following Pattern 2 for the Database requests
    const request_1: Settings_Request = {
      request_type: "request:list-connections",
      doctype: modul_props.doctype,
      request_options: [],
    };

    const buaUnsubscribe_func = RequestData_IPC.init_and_load_data<any>({
      viewtype: "list",
      modul_props: modul_props,

      request: request_1,
      ipc_channel: "ipc-settings",

      surpress_buttons: false,
      setDataCallback: function (result: any): void {
        let list: DocCatalogType[] = result.options;
        setSelectedRowKeys([result.selected]);

        // TODO das noch wie bei dem anderen machen
        let newList: DataType[] = list.map((item: DocCatalogType) => {
          let o: DataType = {
            key: item.id,
            templateName: item.templateName,
            templateDescription: item.templateDescription,
            dbName: item.dbName,
            dbOption: item.dbOption,
          };
          return o;
        });

        setTableData(newList);
      },
      doButtonActionCallback: function (response: Action_Request): void {
        // only used in form so far.
      },
    });

    const request_2: Settings_Request = {
      request_type: "request:get-startoptions",
      doctype: "catalog",
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request_2])
      .then((result: any) => {
        setStartoptions(result.options);

        setSelectedStartoption(result.selected);
        isSelectedShow(result.selected);

        setSelectedCatalog(result.opensOnStartup);
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });

    // Cleanup function to remove the listener on component unmount
    return () => {
      buaUnsubscribe_func();
    };
  }, []);

  function reload_list(): void {
    const request: Settings_Request = {
      request_type: "request:list-connections",
      doctype: "catalog",
      request_options: [],
    };

    RequestData_IPC.load_data<any>({
      modul_props: modul_props,
      ipc_channel: "ipc-settings",
      request: request,
      setDataCallback: function (result: any): void {
        let list: DocCatalogType[] = result.options;
        setSelectedRowKeys([result.selected]);

        // TODO das noch wie bei dem anderen machen
        let newList: DataType[] = list.map((item: DocCatalogType) => {
          let o: DataType = {
            key: item.id,
            templateName: item.templateName,
            templateDescription: item.templateDescription,
            dbName: item.dbName,
            dbOption: item.dbOption,
          };
          return o;
        });

        setTableData(newList);
      },
    });
  }

  //--------------------------------------------------------------
  // Start Options
  //--------------------------------------------------------------
  function getStartoptions(): Array<any> {
    return startoptions.map((item: { id: any; name: any }) => {
      return { value: item.id, label: item.name };
    });
  }

  function getCatalogChooser(): Array<any> {
    // i get them from the table
    return tabledata.map((item: { key: any; templateName: any }) => {
      return { value: item.key, label: item.templateName };
    });
  }

  /**
   * Open a specific catalogue on startup.
   * 'catalog.startoptions.selected'
   * 'catalog.startoptions.options'
   * @param value
   */
  function isSelectedShow(value: string) {
    if (value == "32fe3517-161c-4146-86c8-8bd5e993d671") {
      setSelectedShowCatalogChooser(true);
    } else {
      setSelectedShowCatalogChooser(false);
    }
  }

  const handleStartoptionsChange = (value: string) => {
    isSelectedShow(value);

    console.log(`setSelectedStartoption(${value})`);
    console.log(`selectedStartoption before:${selectedStartoption}`);
    setSelectedStartoption(value);
    console.log(`selectedStartoption after:${selectedStartoption}`);

    const request: Settings_Request = {
      request_type: "request:save-startoption-selected",
      doctype: "catalog",
      id: value,
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request])
      .then((result: any) => {
        console.log("startoption saved");
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  };

  function handleCatalogChooserChange(value: Key, option: any): void {
    setSelectedCatalog(option);

    const request: Settings_Request = {
      request_type: "request:save-startoption-opensOnStartup",
      doctype: "catalog",
      id: value as string,
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request])
      .then((result: any) => {
        console.log("startoption saved");
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  }

  //--------------------------------------------------------------
  // Table-Actions
  //--------------------------------------------------------------

  const handleView = (record: DataType) => {
    navigate(`/catalog/view/${record.key}`);
  };
  function handleEdit(item: DataType): any {
    navigate(`/catalog/form/${item.key}`);
  }
  function handleBackup(item: DataType): any {
    console.log("Backup", item);
    const request: Settings_Request = {
      request_type: "request:database-backup",
      doctype: "catalog",
      request_options: [],
      request_properties: {
        dbName: item.dbName,
      },
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request])
      .then((result: any) => {
        App_Messages_IPC.request_message(
          "request:message-success",
          "Das Backup wurde erzeugt."
        );
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  }

  function handleExport(item: DataType): any {
    console.log("Export", item);

    const request: Settings_Request = {
      request_type: "request:database-export",
      request_properties: {
        dbName: item.dbName,
      },
      doctype: "catalog",
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request])
      .then((result: any) => {
        App_Messages_IPC.request_message(
          "request:message-success",
          "Der JSON- export wurde erzeugt."
        );
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  }

  const handleDeletePopconfirmOk = (record: DataType) => {
    console.log("delete", record);
    const request: Settings_Request = {
      request_type: "request:delete-connection",
      id: record.key as string,
      doctype: "catalog",
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request])
      .then((result: any) => {
        App_Messages_IPC.request_message(
          "request:message-info",
          JSON.stringify(result)
        );
        reload_list();
      })
      .catch(function (error: { message: any }): any {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  };

  const handleDeletePopconfirmCancel = (record: DataType) => {};

  //--------------------------------------------------------------
  // Table
  //--------------------------------------------------------------
  interface DataType {
    key: React.Key;
    templateName: string;
    templateDescription: string;
    dbName: string;
    dbOption: string;
  }

  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "templateName",
      render: (text: string, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
    },
    {
      title: "Description",
      dataIndex: "templateName",
    },
    {
      title: "Type",
      dataIndex: "dbOption",
    },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="default"
            shape="circle"
            size="middle"
            onClick={() => handleView(record)}
          >
            <Tooltip title="Eintrag ansehen">
              <EyeOutlined />
            </Tooltip>
          </Button>

          <Button
            type="default"
            shape="circle"
            size="middle"
            onClick={() => handleEdit(record)}
          >
            <Tooltip title="Eintrag bearbeiten">
              <EditOutlined />
            </Tooltip>
          </Button>

          <Button
            type="default"
            shape="circle"
            size="middle"
            onClick={() => handleBackup(record)}
          >
            <Tooltip title="Backup anlegen (Zip-Archiv)">
              <FileZipOutlined />
            </Tooltip>
          </Button>

          <Button
            type="default"
            shape="circle"
            size="middle"
            onClick={() => handleExport(record)}
          >
            <Tooltip title="Export als Json Datei">
              <DownloadOutlined />
            </Tooltip>
          </Button>

          <Popconfirm
            title="Datenbank löschen!"
            description="Bist du ganz sicher?"
            onConfirm={() => handleDeletePopconfirmOk(record)}
            onCancel={() => handleDeletePopconfirmCancel(record)}
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

  // <a onClick={() => handleView(record)}>View</a>
  // <a onClick={() => handleEdit(record)}>Edit</a>
  // <a onClick={() => handleBackup(record)}>backup</a>
  // <a style={{ color: "red" }}>Delete</a>

  const onTableSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);

    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      newSelectedRowKeys
    );
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);

    const request: Settings_Request = {
      request_type: "request:switch-catalog",
      doctype: "catalog",
      id: newSelectedRowKeys[0] as string,
      request_options: [],
    };

    window.electronAPI
      .invoke_request(IPC_SETTINGS, [request])
      .then((result: any) => {
        console.log("Catalog switched.");
        App_Messages_IPC.request_message(
          "request:message-info",
          "Catalog switched."
        );
      })
      .catch(function (error: any) {
        App_Messages_IPC.request_message(
          "request:message-error",
          error instanceof Error ? `Error: ${error.message}` : ""
        );
      });
  };

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onTableSelectChange,
  };

  return (
    <>
      <Space>
        <Select
          defaultValue={selectedStartoption}
          value={selectedStartoption}
          style={{ width: 310, marginBottom: 15 }}
          onChange={handleStartoptionsChange}
          options={getStartoptions()}
        />
        <Select
          // defaultValue={selectedRowKeys[0]}
          value={selectedCatalog}
          style={{
            visibility: selectedShowCatalogChooser ? "visible" : "hidden",
            width: 310,
            marginBottom: 15,
          }}
          onChange={handleCatalogChooserChange}
          options={getCatalogChooser()}
        />
      </Space>

      <Tabs
        type="card"
        items={[
          {
            label: modul_props.doclabel,
            key: "0",
            children: (
              <Table
                rowSelection={{
                  type: "radio",
                  ...rowSelection,
                }}
                columns={columns}
                dataSource={tabledata}
              />
            ),
          },
          {
            label: `Datentransport`,
            key: "1",
            children: <ExportForm />,
          },
        ]}
      ></Tabs>
    </>
  );
}
