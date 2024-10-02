/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { modul_props } from "../modul_props";
import { GenreI } from "../../../common/custom/types/documents/DocGenre";
import { MyBasicView } from "../../../frontend/custom/components/myBasicView";

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
export function GenreView() {
  const { id } = useParams();

  const fieldsGenre: MyBasicViewFieldParameterI<GenreI>[] = [
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

  const segmentGenres: MyBasicViewSegmentParameterI<GenreI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsGenre,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<GenreI>[] = [segmentGenres];

  return (
    <MyBasicView<GenreI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}
