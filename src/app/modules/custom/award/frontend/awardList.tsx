import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { modul_props } from "../modul_props";
import { AwardI } from "../../../../common/custom/types/documents/DocAward";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";

/**
 * Ein Liste der Awards.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function AwardList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<AwardI> = [
    {
      title: "Titel",
      dataIndex: "title",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Jahr",
      dataIndex: "year",
      key: "id",
    },
    {
      title: "Beschreibung",
      dataIndex: "description",
      key: "id",
    },
  ];

  return (
    <MyBasicList
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    />
  );
}
