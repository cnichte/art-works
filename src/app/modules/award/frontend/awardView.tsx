import { useParams } from "react-router-dom";
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { Segments } from "../../../frontend/Segments";
import { modul_props } from "../modul_props";
import { AwardI } from "../../../common/types/DocAward";
import { CompilationI } from "../../../common/types/DocCompilation";
import { ArtworkI } from "../../../common/types/DocArtwork";
import { PublicationI } from "../../../common/types/DocPublication";

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


  const fieldsAward: MyBasicViewFieldParameterI<AwardI>[] = [
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

  const segmentAwards: MyBasicViewSegmentParameterI<AwardI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsAward,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<AwardI | ArtworkI | CompilationI | PublicationI>[] = [
    segmentAwards,
    Segments.getSegmentArtworks(modul_props.segment),
    Segments.getSegmentCompilations(modul_props.segment),
    Segments.getSegmentPublications(modul_props.segment),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicView<AwardI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}