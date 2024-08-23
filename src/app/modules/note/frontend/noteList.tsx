import { useNavigate } from "react-router";

import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'

import { NoteI } from "../../../common/types/DocNote";
import { modul_props } from "../modul_props";
import { Typography } from "antd";

/**
 * Ein Liste der Notizen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function NoteList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<NoteI> = [
    {
      title: "Name",
      dataIndex: "title",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Inhalt",
      dataIndex: "content",
      key: "id",
      render: (text, record) => (
        <Typography.Paragraph
          ellipsis={{
            rows: 3,
            expandable: "collapsible",
          }}
        >
          {text}
        </Typography.Paragraph>
      ),
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
