import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../../common/types/MyBasicViewTypes";
import { modul_props } from "../modul_props";
import { NoteI } from "../../../../common/custom/types/documents/DocNote";
import { MyBasicView } from "../../../../frontend/custom/components/myBasicView";

/* ==========================================================

    * ReactNode: NoteView

   ========================================================== */

/**
 * Read Only View for Module Note.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns NoteView
 */
export function NoteView() {
  const { id } = useParams();

  const fieldsNote: MyBasicViewFieldParameterI<NoteI>[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "content",
      label: "Inhalt",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  const segmentNotes: MyBasicViewSegmentParameterI<NoteI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsNote,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<NoteI>[] = [segmentNotes];

  return (
    <MyBasicView<NoteI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}