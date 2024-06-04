/* eslint-disable react/jsx-no-bind */
import { useParams } from 'react-router-dom';

import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from '../../../common/frontend/myBasicView';
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from '../../../common/frontend/types/MyBasicViewTypes';

/* ==========================================================

    * ReactNode: CalculationView

   ========================================================== */

/**
 * Read Only View for Module Calculation.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns CalculationView
 */
function CalculationView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const moduleId = 'calculation';

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

  const fieldsCalculation: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: 'title',
      label: 'Titel',
    },
    {
      dataIndex: 'description',
      label: 'Beschreibung',
    },
    {
      dataIndex: 'shortnote',
      label: 'Notiz',
    },
    {
      dataIndex: "calc",
      label: "Kalkulation",
      // this is an array. render inline childs in separate table.
      childs: [
        {
          dataIndex: "title",
          label: "Titel",
        },
        {
          dataIndex: "value",
          label: "Preis",
        },
        {
          dataIndex: "shortnote",
          label: "Notiz",
        }
      ],
    },
  ];

  const segmentCalculations: MyBasicViewSegmentParameterI = {
    segment: 'calculations',
    label: 'Kalkulation',
    fields: fieldsCalculation,
    relationFilterIdField: 'id',
    render: 'description',
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentCalculations];

  return (
    <MyBasicView
      id={id}
      moduleLabel="Kalkulation"
      moduleId={moduleId}
      requests={requests}
      segmentSets={segmentSets}
    />
  );
}
export default CalculationView;
