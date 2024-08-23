import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'

import { GroupOfWorkI } from "../../../common/types/DocGroupOfWork";
import { modul_props } from "../modul_props";
import { Typography } from "antd";

/**
 * Ein Liste der Werkgruppen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function GroupOfWorkList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<GroupOfWorkI> = [
    {
      title: "Titel",
      dataIndex: "title",
      key: "id",
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Beschreibung",
      dataIndex: "description",
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
    {
      title: "Artworks",
      dataIndex: "artworks",
      key: "id",
      render: (text, record) => record.artworks.length,
      sorter: (a, b) => a.artworks.length - b.artworks.length,
    },
    {
      title: "Notiz",
      dataIndex: "shortnote",
      key: "id",
    },
    {
      title: "von",
      dataIndex: "zeitraum_von",
      key: "id",
      sorter: (a, b) => a.zeitraum_von.localeCompare(b.zeitraum_von),
    },
    {
      title: "bis",
      dataIndex: "zeitraum_bis",
      key: "id",
      sorter: (a, b) => a.zeitraum_bis.localeCompare(b.zeitraum_bis),
    },
  ];

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList<GroupOfWorkI> listTypes={['list']} modul_props={modul_props} columns={columns} />
  );
}
