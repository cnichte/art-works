import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { modul_props } from "../modul_props";
import { PublicationI } from "../../../../common/custom/types/documents/DocPublication";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";

/**
 * Ein Liste der Publikationen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function PublicationList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<PublicationI> = [
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
      title: "Verlag",
      dataIndex: "publisher",
      key: "id",
    },
    {
      title: "Url",
      dataIndex: "url",
      key: "id",
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicList
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    />
  );
}
