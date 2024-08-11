/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import { MyBasicViewFieldParameterI, MyBasicViewSegmentParameterI } from '../../../common/types/MyBasicViewTypes';
import MyBasicView from '../../../frontend/myBasicView';
import { DocType } from '../../../common/types/DocType';

import { EditionI } from "../../../common/types/DocEdition";
import { modul_props } from "../modul_props";

/* ==========================================================

    * ReactNode: EditionView

   ========================================================== */

/**
 * Read Only View for Module Edition.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns EditionView
 */
function EditionView() {
  const { id } = useParams();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const fieldsEdition: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "edition",
      label: "Menge",
    },
    {
      dataIndex: "artistsPrint",
      label: "Anzahl Artist Prints",
    },
    {
      dataIndex: "prices",
      label: "Preise",
      // this is an array. render inline childs in separate table.
      childs_render:"list", // list, string
      childs: [
        {
          dataIndex: "description",
          label: "Beschreibung",
        },
        {
          dataIndex: "numberStart",
          label: "Startnummer",
        },
        {
          dataIndex: "numberEnd",
          label: "Endnummer",
        },
        {
          dataIndex: "price",
          label: "Preis",
        },
      ],
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  const segmentEditions: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsEdition,
    relationFilterIdField: "id",
    render: "description", // "description" | "table" | "component"
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentEditions];

  return (
      <MyBasicView<EditionI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
      />
  );
}
export default EditionView;
