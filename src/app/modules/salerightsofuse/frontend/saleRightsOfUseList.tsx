import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import { MyBasicList } from "../../../frontend/myBasicList"; // ../../../frontend/myBasicList'
import { DocType } from "../../../common/types/DocType";
import { SaleRightsOfUseI } from '../../../common/types/DocSaleRightsOfUse';


/**
 * Ein Liste der Nutzungsrechte.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function SaleRightsOfUseList() {
  const navigate = useNavigate();

  const doclabel:string = "Nutzungsrecht";
  const doctype:DocType = "salerightsofuse";
  const segment:string = "salerightsofuses";

  //* open view
  const handleView = (record: { id: any }) => {
    console.log('--- handleView:', record);
    console.log(`--- navigate  : '/${doctype}/view/${record.id}'`);
    navigate(`/${doctype}/view/${record.id}`);
  };

  const columns: ColumnsType<SaleRightsOfUseI> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'id',
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Beschreibung',
      dataIndex: 'descriptionShort',
      key: 'id',
    },
    {
      title: 'Url',
      dataIndex: 'url',
      key: 'id',
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicList<SaleRightsOfUseI>
    doclabel={doclabel}
    doctype={doctype}
    segment={segment}
    columns={columns}
    />
  );
}

export default SaleRightsOfUseList;
