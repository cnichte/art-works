/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: TagView

   ========================================================== */

/**
 * Read Only View for Module Tag.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns TagView
 */
function TagView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const moduleId = 'tag';

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

  const fieldsTag: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'parent',
      label: 'Gehört zu Tag',
      mapKeyTo: 'tags',
      useChilds: ['name'],
    },
    {
      dataIndex: 'name',
      label: 'Name',
    },
    {
      dataIndex: 'color',
      label: 'Farbe',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
  ];

  const segmentTags: MyBasicViewSegmentParameterI = {
    segment: 'tags',
    label: 'Tags',
    fields: fieldsTag,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentTags];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Tag"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default TagView;
