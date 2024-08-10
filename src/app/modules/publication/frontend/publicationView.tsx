/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";
import { Segments } from "../../../frontend/Segments";

import { PublicationI } from "../../../common/types/DocPublication";

/* ==========================================================

    * ReactNode: PublicationView

   ========================================================== */

/**
 * Read Only View for Module Publication.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns PublicationView
 */
function PublicationView() {
  const { id } = useParams();

  const doclabel: string = "Publikation";
  const doctype: DocType = "publication";
  const segment: string = "publications";

  const fieldsPublication: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "subtitle",
      label: "Untertitel",
    },
    {
      dataIndex: "publicationType",
      label: "Typ",
      mapKeyTo: {
        dataIndex: "publicationTypes",
        showFields: ["name"],
      },
    },
    {
      dataIndex: "publicationWhat",
      label: "Art",
      mapKeyTo: {
        dataIndex: "publicationWhats",
        showFields: ["name"],
      },
    },
    {
      dataIndex: "publicationMedium",
      label: "Medium",
      mapKeyTo: {
        dataIndex: "publicationMediums",
        showFields: ["name"],
      },
    },
    {
      dataIndex: "isbn",
      label: "ISBN",
    },
    {
      dataIndex: "publisher",
      label: "Verlag",
    },
    {
      dataIndex: "nationallibrary",
      label: "Nationalbibliothek",
    },
    {
      dataIndex: "url",
      label: "Webadresse",
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

  const segmentPublications: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsPublication,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentPublications,
    Segments.getSegmentArtworks(segment),
    Segments.getSegmentAwards(segment),
    Segments.getSegmentSales(segment),
  ];

  return (
    <MyBasicView<PublicationI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
export default PublicationView;
