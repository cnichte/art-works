import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicList } from '../../../common/frontend/myBasicList';
import { RentalI } from '../types/RenatlInterface';

/**
 * Ein Liste der Notizen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function RentalList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = 'rental';

  const requests = RequestFactory.getListRequestsFor(moduleId, 'ipc-database');

  /* ----------------------------------------------------------

    Standard Actions

   ---------------------------------------------------------- */
  //* open view
  const handleView = (record: { id: any }) => {
    console.log('--- handleView:', record);
    navigate(`/${moduleId}/view/${record.id}`);
  };

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Die Spaltendefinition für die Tabelle

    ---------------------------------------------------------- */
  const columns: ColumnsType<RentalI> = [
    {
      title: 'Shortnote',
      dataIndex: 'shortnote',
      key: 'id',
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.shortnote.localeCompare(b.shortnote),
    },
    {
      title: 'Type',
      dataIndex: 'saleType',
      key: 'id',
    },
    {
      title: 'Preis',
      dataIndex: 'artworkPrice',
      key: 'id',
    },
    {
      title: 'Kunde',
      dataIndex: 'customer',
      key: 'id',
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList
      moduleLabel="Verleih"
      moduleId={moduleId}
      requests={requests}
      segment="rentals"
      columns={columns}
    />
  );
}

export default RentalList;
