/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";

import { CompilationI } from "../../../common/types/DocCompilation";

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
export default function CompilationView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const doclabel: string = "Zusammenstellung";
  const doctype: DocType = "compilation";
  const segment: string = "compilations";

  const fieldsCompilation: MyBasicViewFieldParameterI[] = [
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

  const segmentCompilations: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsCompilation,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentCompilations];

  return (
    <MyBasicView<CompilationI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
