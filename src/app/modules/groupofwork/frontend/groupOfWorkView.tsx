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

    * ReactNode: GroupOfWorkView

   ========================================================== */

/**
 * Read Only View for Module GroupOfWork.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns GroupOfWorkView
 */
function GroupOfWorkView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const moduleId = 'groupofwork';

  const requests = RequestFactory.getViewRequestsFor(moduleId, 'ipc-database');

  /* ----------------------------------------------------------

    Standard View Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Fields (rendered in Tables, or Descriptions)

   ---------------------------------------------------------- */
  const fieldsGroupofwork: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'title',
      label: 'Titel',
    },
    {
      dataIndex: 'description',
      label: 'Beschreibung',
    },
    {
      dataIndex: 'zeitraum_von',
      label: 'Zeitraum von',
    },
    {
      dataIndex: 'zeitraum_bis',
      label: 'Zeitraum bis',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  /* ----------------------------------------------------------

    Segmente (rendered in Tabs)

   ---------------------------------------------------------- */

  const segmentGroupsofwork: MyBasicViewSegmentParameterI = {
    segment: 'groupsofwork',
    label: 'Werkgruppe',
    fields: fieldsGroupofwork,
    relationFilterIdField: 'id',
    render: 'description',
  };


  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentGroupsofwork,
    Segments.getSegmentArtworks('groupsofwork'),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */

  return (
    <MyBasicView
      id={id}
      moduleLabel="Werkgruppe"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default GroupOfWorkView;
