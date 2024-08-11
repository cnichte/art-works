/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";

import { GroupOfWorkI } from "../../../common/types/DocGroupOfWork";
import { Segments } from "../../../frontend/Segments";
import { modul_props } from "../modul_props";

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
export default function GroupOfWorkView() {
  const { id } = useParams();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const fieldsGroupofwork: MyBasicViewFieldParameterI[] = [
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

  const segmentGroupsofwork: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsGroupofwork,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentGroupsofwork,
    Segments.getSegmentArtworks(segment),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */

  return (
    <MyBasicView<GroupOfWorkI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
