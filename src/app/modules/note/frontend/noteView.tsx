import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";

import { NoteI } from "../../../common/types/DocNote";
import { modul_props } from "../modul_props";

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
function NoteView() {
  const { id } = useParams();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const fieldsNote: MyBasicViewFieldParameterI[] = [
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

  const segmentNotes: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsNote,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentNotes];

  return (
    <MyBasicView<NoteI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
export default NoteView;
