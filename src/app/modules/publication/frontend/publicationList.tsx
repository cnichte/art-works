import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'
import { DocType } from "../../../common/types/DocType";

import { PublicationI } from "../../../common/types/DocPublication";
import { modul_props } from "../modul_props";

/**
 * Ein Liste der Publikationen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function PublicationList() {
  const navigate = useNavigate();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${doctype}/view/${record.id}'`);
    navigate(`/${doctype}/view/${record.id}`);
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
      doclabel={doclabel}
      doctype={doctype}
      segment={segment}
      columns={columns}
    />
  );
}

export default PublicationList;
