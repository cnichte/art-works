/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { MyBasicView } from "../../../frontend/myBasicView";
import { Segments } from "../../../frontend/Segments";

import { PublicationI } from "../../../common/types/DocPublication";
import { modul_props } from "../modul_props";
import { ArtworkI } from "../../../common/types/DocArtwork";
import { AwardI } from "../../../common/types/DocAward";
import { SaleI } from "../../../common/types/DocSale";

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
export function PublicationView() {
  const { id } = useParams();

  const fieldsPublication: MyBasicViewFieldParameterI<PublicationI>[] = [
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

  const segmentPublications: MyBasicViewSegmentParameterI<PublicationI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsPublication,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<
    PublicationI | ArtworkI | AwardI | SaleI
  >[] = [
    segmentPublications,
    Segments.getSegmentArtworks(modul_props.segment),
    Segments.getSegmentAwards(modul_props.segment),
    Segments.getSegmentSales(modul_props.segment),
  ];

  return (
    <MyBasicView<PublicationI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}
