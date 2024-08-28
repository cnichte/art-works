import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { MyBasicList } from "../../../frontend/myBasicList"; // src/app/frontend/myBasicList'
import { ArtistI } from "../../../common/types/DocArtist";
import { modul_props } from "../modul_props";

/**
 * Ein Liste der Artist.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function ArtistList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<ArtistI> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
     /*
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      */
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Künstlername",
      dataIndex: "alias",
      key: "id",
    },
    {
      title: "Stadt",
      dataIndex: "city",
      key: "id",
    },
    {
      title: "eMail",
      dataIndex: "mail",
      key: "id",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "id",
    },
  ];

  return (
    <MyBasicList<ArtistI>
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    />
  );
}
