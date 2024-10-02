/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { modul_props } from "../modul_props";
import { CompilationI } from "../../../common/custom/types/documents/DocCompilation";
import { MyBasicView } from "../../../frontend/custom/components/myBasicView";

/* ==========================================================

    * ReactNode: CompilationView

   ========================================================== */

/**
 * Read Only View for Module Compilation.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns CompilationView
 */
export function CompilationView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const fieldsCompilation: MyBasicViewFieldParameterI<CompilationI>[] = [
    {
      dataIndex: "title",
      label: "Titel",
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

  const segmentCompilations: MyBasicViewSegmentParameterI<CompilationI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsCompilation,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<CompilationI>[] = [segmentCompilations];

  return (
    <MyBasicView<CompilationI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}
