/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: ArtworkView

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
 * @returns ArtworkView
 */
function WhiteboardView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const moduleId = 'whiteboard';

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

  const fieldsArtwork: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'name',
      label: 'Name',
    },
    {
      dataIndex: 'preview',
      label: 'Vorschau',
    },
  ];

  const segmentArtworks: MyBasicViewSegmentParameterI = {
    segment: 'whiteboards',
    label: 'Whiteboard',
    fields: fieldsArtwork,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentArtworks];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Whiteboard"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default WhiteboardView;
