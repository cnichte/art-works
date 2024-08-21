/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

//import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from "../../../frontend/myBasicView";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { DocType } from "../../../common/types/DocType";
import { WhiteboardI } from "../../../common/types/DocWhiteboard";
import { modul_props } from "../modul_props";

/* ==========================================================

    * ReactNode: ArtworkView

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
 * @returns ArtworkView
 */
export function WhiteboardView() {
  const { id } = useParams();

  const fieldsArtwork: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "preview",
      label: "Vorschau",
    },
  ];

  const segmentArtworks: MyBasicViewSegmentParameterI = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsArtwork,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentArtworks];

  return (
    <MyBasicView<WhiteboardI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}