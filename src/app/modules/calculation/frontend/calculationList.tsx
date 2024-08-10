import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'
import { DocType } from "../../../common/types/DocType";
import { CalculationI } from '../../../common/types/DocCalculation';


/**
 * Ein Liste der Kalkulationen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function CalculationList() {
  const navigate = useNavigate();

  const doclabel:string = "Kalkulation";
  const doctype:DocType = "calculation";
  const segment:string ="calculations";

  //* open view
  const handleView = (record: { id: any }) => {
    console.log('--- handleView:', record);
    console.log(`--- navigate  : '/${doctype}/view/${record.id}'`);
    navigate(`/${doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<CalculationI> = [
    {
      title: 'Titel',
      dataIndex: 'title',
      key: 'id',
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Beschreibung',
      dataIndex: 'description',
      key: 'id',
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList<CalculationI>
    doclabel={doclabel}
    doctype={doctype}
    segment={segment}
    columns={columns}
    />
  );
}

export default CalculationList;
