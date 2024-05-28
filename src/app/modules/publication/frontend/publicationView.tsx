/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';
import Segments from '../../../common/frontend/Segments';

/* ==========================================================

    * ReactNode: PublicationView

   ========================================================== */

/**
 * Read Only View for Module Publication.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns PublicationView
 */
function PublicationView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const moduleId = 'publication';

  const requests = RequestFactory.getViewRequestsFor(moduleId, 'ipc-database');

  /* ----------------------------------------------------------

    Standard View Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  const fieldsPublication: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'title',
      label: 'Titel',
    },
    {
      dataIndex: 'subtitle',
      label: 'Untertitel',
    },
    {
      dataIndex: 'publicationType',
      label: 'Typ',
      mapKeyTo: {
        dataIndex: 'publicationTypes',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'publicationWhat',
      label: 'Art',
      mapKeyTo: {
        dataIndex: 'publicationWhats',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'publicationMedium',
      label: 'Medium',
      mapKeyTo: {
        dataIndex: 'publicationMediums',
        showFields: ['name'],
      },
    },
    {
      dataIndex: 'isbn',
      label: 'ISBN',
    },
    {
      dataIndex: 'publisher',
      label: 'Verlag',
    },
    {
      dataIndex: 'nationallibrary',
      label: 'Nationalbibliothek',
    },
    {
      dataIndex: 'url',
      label: 'Webadresse',
    },
    {
      dataIndex: 'description',
      label: 'Beschreibung',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const segmentPublications: MyBasicViewSegmentParameterI = {
    segment: 'publications',
    label: 'Publikation',
    fields: fieldsPublication,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentPublications,
    Segments.getSegmentArtworks('publications'),
    Segments.getSegmentAwards('publication'),
    Segments.getSegmentSales('publication'),
  ];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Publikation"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default PublicationView;
