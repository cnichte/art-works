import { useNavigate } from 'react-router';
import { Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicList } from '../../../common/frontend/myBasicList';
import { NoteI } from '../types/NoteInterface';

const { Paragraph } = Typography;

/**
 * Ein Liste der Notizen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * @returns
 */
function NoteList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = 'note';

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
  const columns: ColumnsType<NoteI> = [
    {
      title: 'Name',
      dataIndex: 'title',
      key: 'id',
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Inhalt',
      dataIndex: 'content',
      key: 'id',
      render: (text, record) => (
        <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'mehr lesen...' }}>
          {text}
        </Paragraph>
      ),
    },
  ];
  // Invite {record.name}

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicList
      moduleLabel="Notiz"
      moduleId={moduleId}
      requests={requests}
      segment="notes"
      columns={columns}
    />
  );
}

export default NoteList;
