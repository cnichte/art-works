/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: saleRightsOfUseView

   ========================================================== */

/**
 * Read Only View for Module Sale.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns saleRightsOfUseView
 */
function saleRightsOfUseView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const moduleId = 'salerightsofuse';

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
  const fieldsSalerightsofuse: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'name',
      label: 'Name',
    },
    {
      dataIndex: 'descriptionShort',
      label: 'Beschreibung kurz',
    },
    {
      dataIndex: 'descriptionLong',
      label: 'Beschreibung lang',
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

  const segmentSalerightsofuses: MyBasicViewSegmentParameterI = {
    segment: 'salerightsofuses',
    label: 'Nutzungsrecht',
    fields: fieldsSalerightsofuse,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentSalerightsofuses];


  return (
    <MyBasicView
      id={id}
      moduleLabel="Nutzungsrecht"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default saleRightsOfUseView;