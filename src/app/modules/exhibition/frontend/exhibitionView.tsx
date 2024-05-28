/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: ExhibitionView

   ========================================================== */

/**
 * Read Only View for Module Address.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns ExhibitionView
 */
function ExhibitionView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const moduleId = 'exhibition';

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
  const fieldsExhibition: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'title',
      label: 'Titel',
    },
    {
      dataIndex: 'date_vernissage',
      label: 'Datum Vernissage',
    },
    {
      dataIndex: 'date_finissage',
      label: 'Datum Finissage',
    },
    {
      dataIndex: 'description',
      label: 'Beschreibung',
    },
    {
      dataIndex: 'url',
      label: 'Webadresse',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const segmentExhibitions: MyBasicViewSegmentParameterI = {
    segment: 'exhibitions',
    label: 'Ausstellung',
    fields: fieldsExhibition,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentExhibitions];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Kontakt"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default ExhibitionView;
