import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { modul_props } from "../modul_props";
import { TagI } from "../../../../common/custom/types/documents/DocTag";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";

/**
 * Ein Liste der Notizen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function TagList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<TagI> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Farbe",
      dataIndex: "color",
      key: "id",
    },
    {
      title: "Notiz",
      dataIndex: "shortnote",
      key: "id",
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList<TagI>
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    />
  );
}
