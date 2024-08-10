import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/myBasicList";
import { DocType } from "../../../common/types/DocType";

import { AddressI } from "../../../common/types/DocAddress";

/**
 * Ein Liste der Adressen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export default function AdressList() {
  const navigate = useNavigate();

  const doclabel:string = "Adresse";
  const doctype:DocType = "address";
  const segment:string ="addresses";

  //* open view
  const handleView = (record: { id: any }) => {
    console.log('--- handleView:', record);
    console.log(`--- navigate  : '/${doctype}/view/${record.id}'`);
    navigate(`/${doctype}/view/${record.id}`);
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
      doclabel={doclabel}
      doctype={doctype}
      segment={segment}
      columns={columns}
    /> // TODO neue Attribute in Props - rowSelectionActive={false} rowSelectionType={'checkbox'} rowSelectionCallback={null}
  );
}
