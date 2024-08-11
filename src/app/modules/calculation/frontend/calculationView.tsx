/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import { MyBasicViewFieldParameterI, MyBasicViewSegmentParameterI } from '../../../common/types/MyBasicViewTypes';
import MyBasicView from '../../../frontend/myBasicView';
import { DocType } from '../../../common/types/DocType';

import { CalculationI } from "../../../common/types/DocCalculation";
import { modul_props } from "../modul_props";

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

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const fieldsCalculation: MyBasicViewFieldParameterI[] = [
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

  const segmentCalculations: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsCalculation,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentCalculations];

  return (
    <MyBasicView<CalculationI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}