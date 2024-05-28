import { useNavigate } from 'react-router';
import type { ColumnsType } from 'antd/es/table';

import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicList } from '../../../common/frontend/myBasicList';
import { CompilationI } from '../../compilation/types/CompilationInterface'; // TODO Eigenes Interface bauen!

/**
 * Ein Liste der Zusammenstellungen.
 *
 * Hier sind drei Komponenten im Spiel:
 * React, Antd, und das Electron IPC-Protokoll.
 *
 * TODO: CompilationInterface ist ja wohl auch total falsch - die anderen Views diesbezüglich auch überprüfen.
 *
 * TODO DataType --- den korrekten Typ als Generic 'übergeben'.
 * https://stackoverflow.com/questions/70681035/passing-types-as-arguments-in-typescript
 * https://medium.com/edonec/creating-a-generic-component-with-react-typescript-2c17f8c4386e
 *
 * TODO: Set selected ROW ... (den aktiven Katalog selektieren, und dann auch tatsächlich nutzen)
 *
 * @returns
 */
function CatalogsList() {
  const navigate = useNavigate();

  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const moduleId = 'catalogs';

  const requests = RequestFactory.getListRequestsFor(moduleId, 'ipc-settings');

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
  const columns: ColumnsType<CompilationI> = [
    {
      title: 'Name des Katalogs',
      dataIndex: 'templateName',
      key: 'id',
      render: (text, record) => (
        <a onClick={() => handleView(record)}> {text} </a>
      ),
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Beschreibung',
      dataIndex: 'templateDescription',
      key: 'id',
    },
  ];
  // Invite {record.name}

  const rowSelectionChanged = (selectedRowKeys:any, selectedRows:any) => {
    console.log(
      `####### selectedRowKeys: ${selectedRowKeys}`,
      '####### selectedRows: ',
      selectedRows
    );
  };

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicList
      moduleLabel="Katalog"
      moduleId={moduleId}
      requests={requests}
      segment="catalogs"
      columns={columns}
      rowSelectionActive
      rowSelectionType="radio"
      rowSelectionCallback={rowSelectionChanged}
    />
  );
}

export default CatalogsList;
