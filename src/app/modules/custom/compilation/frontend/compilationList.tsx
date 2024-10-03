import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { modul_props } from "../modul_props";
import { CompilationI } from "../../../../common/custom/types/documents/DocCompilation";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";

/**
 * Ein Liste der Zusammenstellungen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function CompilationList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
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
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    />
  );
}
