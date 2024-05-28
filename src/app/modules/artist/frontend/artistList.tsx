import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicList } from '../../../common/frontend/myBasicList';
import { ArtistI } from '../types/ArtistInterface';

/**
 * Ein Liste der Artist.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function ArtistList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = 'artist';

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
  const columns: ColumnsType<ArtistI> = [
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
      title: 'Künstlername',
      dataIndex: 'alias',
      key: 'id',
    },
    {
      title: 'Stadt',
      dataIndex: 'city',
      key: 'id',
    },
    {
      title: 'eMail',
      dataIndex: 'mail',
      key: 'id',
    },
    {
      title: 'Telefon',
      dataIndex: 'phone',
      key: 'id',
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */

  return (
    <MyBasicList
      moduleLabel="Künstler"
      moduleId={moduleId}
      requests={requests}
      segment="artists"
      columns={columns}
    />
  );
}

export default ArtistList;
