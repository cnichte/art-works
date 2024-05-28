/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';
import MyBasicView from '../../../common/frontend/myBasicView';
import ExportForm from './exportForm';

/* ==========================================================

    * ReactNode: CatalogsView

   ========================================================== */

/**
 * Read Only View for Module Catalog.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns CatalogsView
 */
function CatalogsView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const moduleId = 'catalogs';

  const requests = RequestFactory.getViewRequestsFor(moduleId, 'ipc-settings');

  /* ----------------------------------------------------------

    Standard View Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  const fieldsCatalog: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'templateName',
      label: 'Name',
    },
    {
      dataIndex: 'templateDescription',
      label: 'Beschreibung',
    },
    {
      dataIndex: 'dbHost',
      label: 'Host',
    },
    {
      dataIndex: 'dbPort',
      label: 'Port',
    },
    {
      dataIndex: 'dbName',
      label: 'Datenbank-Name',
    },
    {
      dataIndex: 'dbUser',
      label: 'Datenbank-User',
    },
    {
      dataIndex: 'dbTemplate',
      label: 'Template',
    },
  ];

  const segmentCatalogs: MyBasicViewSegmentParameterI = {
    segment: 'catalogs',
    label: 'Katalog',
    fields: fieldsCatalog,
    relationFilterIdField: 'id',
    render: 'description',
  };

  const segmentExport: MyBasicViewSegmentParameterI = {
    segment: 'export',
    label: 'Import & Export',
    fields: undefined,
    relationFilterIdField: 'id',
    render: 'component',
    component: <ExportForm />,
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentCatalogs,
    segmentExport,
  ];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Katalog"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default CatalogsView;
