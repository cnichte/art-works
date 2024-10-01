import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/components/myBasicList";

import { AddressI } from "../../../common/types/documents/DocAddress";
import { modul_props } from "../modul_props";

/**
 * Ein Liste der Adressen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function AddressList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<AddressI> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
      filters: [
        {
          text: "London",
          value: "London",
        },
        {
          text: "New York",
          value: "New York",
        },
      ],
      onFilter: (value, record) =>
        record.name.indexOf(value as string) === 0,
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
    <MyBasicList<AddressI>
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    /> // TODO neue Attribute in Props - rowSelectionActive={false} rowSelectionType={'checkbox'} rowSelectionCallback={null}
  );
}
