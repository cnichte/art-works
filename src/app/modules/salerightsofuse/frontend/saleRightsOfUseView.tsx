/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import MyBasicView from "../../../frontend/myBasicView";
import { DocType } from "../../../common/types/DocType";

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
function saleRightsOfUseView() {
  const { id } = useParams();

  const doclabel: string = "Nutzungsrecht";
  const doctype: DocType = "salerightsofuse";
  const segment: string = "salerightsofuses";

  const fieldsSalerightsofuse: MyBasicViewFieldParameterI[] = [
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

  const segmentSalerightsofuses: MyBasicViewSegmentParameterI = {
    segment: segment,
    label: doclabel,
    fields: fieldsSalerightsofuse,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentSalerightsofuses];

  return (
    <MyBasicView
      id={id}
      doclabel={doclabel}
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
export default saleRightsOfUseView;
