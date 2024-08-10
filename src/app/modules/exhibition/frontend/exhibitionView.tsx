/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";

import { ExhibitionI } from "../../../common/types/DocExhibition";

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

  const doclabel: string = "Ausstellung";
  const doctype: DocType = "exhibition";
  const segment: string = "exhibitions";

  const fieldsExhibition: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "date_vernissage",
      label: "Datum Vernissage",
    },
    {
      dataIndex: "date_finissage",
      label: "Datum Finissage",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "url",
      label: "Webadresse",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  const segmentExhibitions: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsExhibition,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentExhibitions];

  return (
    <MyBasicView<ExhibitionI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
export default ExhibitionView;
