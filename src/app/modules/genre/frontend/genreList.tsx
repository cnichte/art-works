import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicList } from '../../../common/frontend/myBasicList';
import { GenreI } from '../types/GenreInterface';

/**
 * Ein Liste der Genres.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function GenreList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = 'genre';

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
  const columns: ColumnsType<GenreI> = [
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
      dataIndex: 'description',
      key: 'id',
    },
    {
      title: 'Notiz',
      dataIndex: 'shortnote',
      key: 'id',
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicList
      moduleLabel="Genre"
      moduleId={moduleId}
      requests={requests}
      segment="genres"
      columns={columns}
    />
  );
}

export default GenreList;
