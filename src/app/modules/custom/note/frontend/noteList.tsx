import { useNavigate } from "react-router";

import type { ColumnsType } from "antd/es/table";
import { modul_props } from "../modul_props";
import { NoteI } from "../../../../common/custom/types/documents/DocNote";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";

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
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Inhalt",
      dataIndex: "content",
      key: "id",
    },
  ];

  return (
    <MyBasicList<NoteI>
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
      columns_as_link={["title"]}
      columns_as_ellipsis={["content"]}
    />
  );
}
