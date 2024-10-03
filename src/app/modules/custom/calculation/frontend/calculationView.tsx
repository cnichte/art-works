/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import { MyBasicViewFieldParameterI, MyBasicViewSegmentParameterI } from '../../../../common/types/MyBasicViewTypes';
import { modul_props } from "../modul_props";
import { CalculationI } from "../../../../common/custom/types/documents/DocCalculation";
import { MyBasicView } from "../../../../frontend/custom/components/myBasicView";

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
export function CalculationView() {
  const { id } = useParams();


  const fieldsCalculation: MyBasicViewFieldParameterI<CalculationI>[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
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
        },
      ],
    },
  ];

  const segmentCalculations: MyBasicViewSegmentParameterI<CalculationI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsCalculation,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<CalculationI>[] = [segmentCalculations];

  return (
    <MyBasicView<CalculationI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}