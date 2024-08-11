/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";
import { ArtistI } from "../../../common/types/DocArtist";
import { Segments } from "../../../frontend/Segments";
import { modul_props } from "../modul_props";

/* ==========================================================

    * ReactNode: ArtistView

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
 * @returns ArtistView
 */
function ArtistView() {
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  const segment: string =  modul_props.segment;

  const fieldsArtist: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "alias",
      label: "Künstlername",
    },
    {
      dataIndex: "birthdate",
      label: "Geburtstag",
    },
    {
      dataIndex: "phone",
      label: "Telefon",
    },
    {
      dataIndex: "url",
      label: "Webadresse",
    },
    {
      dataIndex: "mail",
      label: "EMail Adresse",
    },
    {
      dataIndex: "street",
      label: "Strasse",
    },
    {
      dataIndex: "postalCode",
      label: "Postleitzahl",
    },
    {
      dataIndex: "city",
      label: "Stadt",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  const fieldsResume: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "resumeType",
      label: "Typ",
      mapKeyTo: {
        dataIndex: "resumeTypes",
        showFields: ["name"],
      },
    },
    {
      dataIndex: "what",
      label: "Was",
    },
    {
      dataIndex: "where",
      label: "Wo",
    },
    {
      dataIndex: "from",
      label: "von",
    },
    {
      dataIndex: "to",
      label: "bis",
    },
  ];

  /* ----------------------------------------------------------

    Segmente (rendered in Tabs)

   ---------------------------------------------------------- */

  const segmentArtists: MyBasicViewSegmentParameterI = {
    segment: "artists",
    label: "Künstler",
    fields: fieldsArtist,
    relationFilterIdField: "id",
    render: "description",
  };

  const segmentResumes: MyBasicViewSegmentParameterI = {
    segment: "resumes",
    label: "Lebenslauf",
    fields: fieldsResume,
    relationFilterIdField: "artist",
    render: "table",
  };

  const segments = new Segments(); // Relation Backlink to

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [
    segmentArtists,
    segmentResumes,
    Segments.getSegmentArtworks(segment),
  ];

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
  return (
    <MyBasicView<ArtistI>
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}

export default ArtistView;

/*
        <Timeline>
          {data.resumes.map((resume) => (
            <Timeline.Item>{resume.title}</Timeline.Item>
          ))}
        </Timeline>
*/
