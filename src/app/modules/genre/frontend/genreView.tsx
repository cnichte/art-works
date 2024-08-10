/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";
import { GenreI } from "../../../common/types/DocGenre";

/* ==========================================================

    * ReactNode: GenreView

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
 * @returns GenreView
 */
function GenreView() {
  const { id } = useParams();

  const doclabel: string = "Genre";
  const doctype: DocType = "genre";
  const segment: string = "genres";

  const fieldsGenre: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  const segmentGenres: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsGenre,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentGenres];

  return (
    <MyBasicView<GenreI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
export default GenreView;
