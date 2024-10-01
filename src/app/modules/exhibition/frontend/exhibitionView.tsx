/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { MyBasicView } from "../../../frontend/components/myBasicView";

import { ExhibitionI } from "../../../common/types/documents/DocExhibition";
import { modul_props } from "../modul_props";

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
export function ExhibitionView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */

  const { id } = useParams();

  const fieldsExhibition: MyBasicViewFieldParameterI<ExhibitionI>[] = [
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

  const segmentExhibitions: MyBasicViewSegmentParameterI<ExhibitionI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsExhibition,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<ExhibitionI>[] = [segmentExhibitions];

  return (
    <MyBasicView<ExhibitionI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}