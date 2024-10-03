import { useNavigate } from "react-router";
import type { ColumnsType } from "antd/es/table";

import { modul_props } from "../modul_props";
import { CalculationI } from "../../../../common/custom/types/documents/DocCalculation";
import { MyBasicList } from "../../../../frontend/custom/components/myBasicList";

/**
 * Ein Liste der Kalkulationen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
export function CalculationList() {
  const navigate = useNavigate();

  //* open view
  const handleView = (record: { id: any }) => {
    console.log("--- handleView:", record);
    console.log(`--- navigate  : '/${modul_props.doctype}/view/${record.id}'`);
    navigate(`/${modul_props.doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<CalculationI> = [
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
      title: "Beschreibung",
      dataIndex: "description",
      key: "id",
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList<CalculationI>
      listTypes={["list"]}
      modul_props={modul_props}
      columns={columns}
    />
  );
}
