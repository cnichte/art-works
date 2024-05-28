import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicList } from '../../../common/frontend/myBasicList';
import { GroupOfWorkI } from '../types/GroupOfWorkInterface';

/**
 * Ein Liste der Werkgruppen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function GroupOfWorkList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = 'groupofwork';

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
  const columns: ColumnsType<GroupOfWorkI> = [
    {
      title: 'Titel',
      dataIndex: 'title',
      key: 'id',
      render: (text, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Beschreibung',
      dataIndex: 'description',
      key: 'id',
    },
    {
      title: 'Artworks',
      dataIndex: 'artworks',
      key: 'id',
      render: (text, record) => record.artworks.length,
      sorter: (a, b) => a.artworks.length - b.artworks.length,
    },
    {
      title: 'Notiz',
      dataIndex: 'shortnote',
      key: 'id',
    },
    {
      title: 'von',
      dataIndex: 'zeitraum_von',
      key: 'id',
      sorter: (a, b) => a.zeitraum_von.localeCompare(b.zeitraum_von),
    },
    {
      title: 'bis',
      dataIndex: 'zeitraum_bis',
      key: 'id',
      sorter: (a, b) => a.zeitraum_bis.localeCompare(b.zeitraum_bis),
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    Rendert den kompletten List View

   ---------------------------------------------------------- */
  return (
    <MyBasicList
      moduleLabel="Werkgruppe"
      moduleId={moduleId}
      requests={requests}
      segment="groupsofwork"
      columns={columns}
    />
  );
}

export default GroupOfWorkList;
