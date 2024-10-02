import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";
import { modul_props } from "../modul_props";
import { SaleI } from "../../../common/custom/types/documents/DocSale";
import { MyBasicList_Meta_I } from "../../../common/framework/types/system/MyBasicListTypes";
import { MyBasicList } from "../../../frontend/custom/components/myBasicList";

/**
 * Ein Liste der Verkäufen.
 *
 * @returns
 */
export function SaleList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
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
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
      columns_meta={columns_meta}
    />
  );
}
