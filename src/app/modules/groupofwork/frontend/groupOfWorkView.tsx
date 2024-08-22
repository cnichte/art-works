/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { MyBasicView } from "../../../frontend/myBasicView";

import { GroupOfWorkI } from "../../../common/types/DocGroupOfWork";
import { Segments } from "../../../frontend/Segments";
import { modul_props } from "../modul_props";
import { ArtworkI } from "../../../common/types/DocArtwork";

/* ==========================================================

    * ReactNode: GroupOfWorkView

   ========================================================== */

/**
 * Read Only View for Module GroupOfWork.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns GroupOfWorkView
 */
export function GroupOfWorkView() {
  const { id } = useParams();

  const fieldsGroupofwork: MyBasicViewFieldParameterI<GroupOfWorkI>[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "zeitraum_von",
      label: "Zeitraum von",
    },
    {
      dataIndex: "zeitraum_bis",
      label: "Zeitraum bis",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  /* ----------------------------------------------------------

    Segmente (rendered in Tabs)

   ---------------------------------------------------------- */

  const segmentGroupsofwork: MyBasicViewSegmentParameterI<GroupOfWorkI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsGroupofwork,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<GroupOfWorkI | ArtworkI>[] = [
    segmentGroupsofwork,
    Segments.getSegmentArtworks(modul_props.segment),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */

  return (
    <MyBasicView<GroupOfWorkI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}
