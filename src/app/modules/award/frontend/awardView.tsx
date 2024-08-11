import { useParams } from "react-router-dom";
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";
import { Segments } from "../../../frontend/Segments";
import { modul_props } from "../modul_props";

/* ==========================================================

    * ReactNode: AwardView

   ========================================================== */

/**
 * Read Only View for Module Award.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns EmptyList
 */
export function AwardView() {
  const { id } = useParams();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string = modul_props.segment;

  const fieldsAward: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "year",
      label: "Jahr",
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

  const segmentAwards: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsAward,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentAwards,
    Segments.getSegmentArtworks(segment),
    Segments.getSegmentCompilations(segment),
    Segments.getSegmentPublications(segment),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicView
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}