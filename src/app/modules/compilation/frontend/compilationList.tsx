import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'
import { DocType } from "../../../common/types/DocType";

import { CompilationI } from "../../../common/types/DocCompilation";

/**
 * Ein Liste der Zusammenstellungen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export default function CompilationList() {
  const navigate = useNavigate();

  const doclabel: string = "Zusammenstellung";
  const doctype: DocType = "compilation";
  const segment: string = "compilations";

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${doctype}/view/${record.id}'`);
    navigate(`/${doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<CompilationI> = [
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
      title: "Beschreibung",
      dataIndex: "description",
      key: "id",
    },
    {
      title: "Notiz",
      dataIndex: "shortnote",
      key: "id",
    },
  ];

  return (
    <MyBasicList<CompilationI>
      doclabel={doclabel}
      doctype={doctype}
      segment={segment}
      columns={columns}
    />
  );
}