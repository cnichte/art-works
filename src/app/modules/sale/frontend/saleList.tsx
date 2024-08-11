import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'
import { DocType } from "../../../common/types/DocType";
import { MyBasicList_Meta_I } from "../../../common/types/MyBasicListTypes";

import { SaleI } from "../../../common/types/DocSale";
import { modul_props } from "../modul_props";

/**
 * Ein Liste der Verkäufen.
 *
 * @returns
 */
function SaleList() {
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

  const columns: ColumnsType<SaleI> = [
    {
      title: "Shortnote",
      dataIndex: "shortnote",
      key: "id",
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.shortnote.localeCompare(b.shortnote),
    },
    {
      title: "Type",
      dataIndex: "saleType",
      key: "id",
    },
    {
      title: "Preis",
      dataIndex: "artworkPrice",
      key: "id",
    },
    {
      title: "Kunde",
      dataIndex: "customer",
      key: "id",
    },
  ];

  // resolve some uuids
  const columns_meta: MyBasicList_Meta_I[] = [
    {
      dataIndex: "saleType",
      mapKeyTo: {
        dataIndex: "saleTypes",
        showFields: ["name"],
      },
    },
    {
      dataIndex: "customer",
      mapKeyTo: {
        dataIndex: "addresses",
        showFields: ["name"],
      },
    },
  ];

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList<SaleI>
      doclabel={doclabel}
      doctype={doctype}
      segment={segment}
      columns={columns}
      columns_meta={columns_meta}
    />
  );
}

export default SaleList;
