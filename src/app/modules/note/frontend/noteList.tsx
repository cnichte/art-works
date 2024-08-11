import { useNavigate } from "react-router";

import type { ColumnsType } from "antd/es/table";
import Paragraph from "antd/es/typography/Paragraph";

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'
import { DocType } from "../../../common/types/DocType";

import { NoteI } from "../../../common/types/DocNote";
import { modul_props } from "../modul_props";

/**
 * Ein Liste der Notizen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function NoteList() {
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
        <Paragraph
          ellipsis={{ rows: 5, expandable: true, symbol: "mehr lesen..." }}
        >
          {text}
        </Paragraph>
      ),
    },
  ];

  return (
    <MyBasicList
      doclabel={doclabel}
      doctype={doctype}
      segment={segment}
      columns={columns}
    />
  );
}

export default NoteList;
