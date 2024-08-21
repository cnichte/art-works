/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";

import { SaleI } from "../../../common/types/DocSale";
import { modul_props } from "../modul_props";

/* ==========================================================

    * ReactNode: SaleView

   ========================================================== */

/**
 * Read Only View for Module Sale.
 *
 * Aranged in a Grid System
 * https://3x.ant.design/components/grid/
 * 24 Rows System
 *
 * Image Carousel
 * <Carousel afterChange={onCarouselChange}>
 *
 * @returns SaleView
 */
export function SaleView() {
  const { id } = useParams();

  const fieldsSale: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "saleType",
      mapKeyTo: {
        dataIndex: "saleTypes",
        showFields: ["name"],
      },
      label: "Type",
    },
    {
      dataIndex: "customer",
      mapKeyTo: {
        dataIndex: "addresses",
        showFields: ["name"],
      },
      label: "Kunde",
    },
    {
      dataIndex: "publication",
      mapKeyTo: {
        dataIndex: "publications",
        showFields: ["title"],
      },
      condition: {
        scope: "field",
        field: "saleType",
        selector: "$eq",
        value: "2932a605-48aa-4368-96b7-21aed8103e38", // Buchverkauf
        action: "showif",
      },
      label: "Publikation",
    },
    {
      dataIndex: "artwork",
      mapKeyTo: {
        dataIndex: "artworks",
        showFields: ["title"],
      },
      condition: {
        scope: "field",
        field: "saleType",
        selector: "$eq",
        value: "0ae7570a-603c-43f3-9667-5aa019dd27eb", // Print (Standard)
        action: "showif",
      },
      label: "Artwork",
    },
    {
      dataIndex: "edition",
      mapKeyTo: {
        dataIndex: "editions",
        showFields: ["title"],
      },
      condition: {
        scope: "field",
        field: "saleType",
        selector: "$eq",
        value: "0ad711be-179b-4fd6-b069-3ee8ada9591a", // Fineartprint (Edition)
        action: "showif",
      },
      label: "Edition",
    },
    {
      dataIndex: "editionNumber",
      label: "Nummer der Edition",
      condition: {
        scope: "field",
        field: "saleType",
        selector: "$eq",
        value: "0ad711be-179b-4fd6-b069-3ee8ada9591a", // Fineartprint (Edition)
        action: "showif",
      },
    },
    {
      dataIndex: "calculatedPrice",
      label: "Kalkulierter Preis",
    },
    {
      dataIndex: "paid",
      label: "Bezahler Preis",
    },
    {
      dataIndex: "shortnote",
      label: "Notiz",
    },
  ];

  const segmentSales: MyBasicViewSegmentParameterI = {
    segment: "sales",
    label: "Verkauf",
    fields: fieldsSale,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentSales];

  return (
    <MyBasicView<SaleI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}