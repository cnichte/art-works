/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

//import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from "../../../frontend/myBasicView";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { WhiteboardI } from "../../../common/types/DocWhiteboard";
import { modul_props } from "../modul_props";
import { Image_Cover2 } from "../../../frontend/Image_Cover";

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

  const fieldsArtwork: MyBasicViewFieldParameterI<WhiteboardI>[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "preview",
      label: "Vorschau",
      //! my own custom renderer following the andt concept.
      render: (text:string, record:WhiteboardI) => <Image_Cover2 image_string={text} ignore_size={true} />,
    },
  ];

  const segmentArtworks: MyBasicViewSegmentParameterI<WhiteboardI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsArtwork,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<WhiteboardI>[] = [segmentArtworks];

  return (
    <MyBasicView<WhiteboardI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}