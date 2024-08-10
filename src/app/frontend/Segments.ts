/* eslint-disable prefer-const */
/**
 ** Segmente (rendered in Tabs).
 * Segmente sind die zusätzlich angezeigten Reiter in den Tabs der Views,
 * die sich auf Relationen beziehen.
 * Im Grunde sind das Templates
 * TODO: Rename ViewTemplateProvider
 *
 * Dem View sind also weitere Dokumente zu geordnet.
 *
 * @author Carsten Nichte, 2023
 */

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../common/types/MyBasicViewTypes";

export class Segments {
  /* ----------------------------------------------------------

    * Segment Artworks

   ---------------------------------------------------------- */
  private static fieldsArtwork: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "description_short",
      label: "Kurzbeschreibung",
    },
    {
      dataIndex: "dateCreation",
      label: "Jahr",
    },
  ];

  public static getSegmentArtworks(
    backlink: string
  ): MyBasicViewSegmentParameterI {
    return {
      segment: "artworks",
      label: "Werke",
      fields: Segments.fieldsArtwork,
      relationFilterIdField: backlink,
      render: "table",
    };
  }

  /* ----------------------------------------------------------

    * Segment Awards

   ---------------------------------------------------------- */

  private static fieldsAward: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "year",
      label: "Jahr",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
    {
      dataIndex: "url",
      label: "Webadresse",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  public static getSegmentAwards(
    backlink: string
  ): MyBasicViewSegmentParameterI {
    return {
      segment: "awards",
      label: "Auszeichnung",
      fields: Segments.fieldsAward,
      relationFilterIdField: backlink,
      render: "table",
    };
  }

  /* ----------------------------------------------------------

    * Segment Compilations

   ---------------------------------------------------------- */

  private static fieldsCompilation: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
  ];

  public static getSegmentCompilations(
    backlink: string
  ): MyBasicViewSegmentParameterI {
    return {
      segment: "compilations",
      label: "Zusammenstellung",
      fields: Segments.fieldsCompilation,
      relationFilterIdField: backlink,
      render: "table",
    };
  }

  /* ----------------------------------------------------------

    * Segment Publication

   ---------------------------------------------------------- */

  private static fieldsPublication: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "title",
      label: "Titel",
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
    },
  ];

  public static getSegmentPublications(
    backlink: string
  ): MyBasicViewSegmentParameterI {
    return {
      segment: "publications",
      label: "Publikationen",
      fields: Segments.fieldsCompilation,
      relationFilterIdField: backlink,
      render: "table",
    };
  }

  /* ----------------------------------------------------------

    * Segment Sales

   ---------------------------------------------------------- */
  private static fieldsSale: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "artwork",
      label: "Artwork",
    },
    {
      dataIndex: "shortnote",
      label: "Kurznotiz",
    },
  ];

  public static getSegmentSales(
    backlink: string
  ): MyBasicViewSegmentParameterI {
    return {
      segment: "sales",
      label: "Verkäufe",
      fields: Segments.fieldsCompilation,
      relationFilterIdField: backlink,
      render: "table",
    };
  }
}
