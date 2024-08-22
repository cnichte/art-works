/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { modul_props } from "../modul_props";
import { SaleRightsOfUseI } from "../../../common/types/DocSaleRightsOfUse";

/* ==========================================================

    * ReactNode: saleRightsOfUseView

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
 * @returns saleRightsOfUseView
 */
export function SaleRightsOfUseView() {
  const { id } = useParams();

  const fieldsSalerightsofuse: MyBasicViewFieldParameterI<SaleRightsOfUseI>[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "descriptionShort",
      label: "Beschreibung kurz",
    },
    {
      dataIndex: "descriptionLong",
      label: "Beschreibung lang",
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

  const segmentSalerightsofuses: MyBasicViewSegmentParameterI<SaleRightsOfUseI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: fieldsSalerightsofuse,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<SaleRightsOfUseI>[] = [segmentSalerightsofuses];

  return (
    <MyBasicView<SaleRightsOfUseI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}