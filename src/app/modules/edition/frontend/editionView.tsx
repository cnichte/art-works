/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

import RequestFactory from "../../../common/backend/RequestFactory";
import MyBasicView from "../../../common/frontend/myBasicView";
import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/frontend/types/MyBasicViewTypes";

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
  /* ----------------------------------------------------------

    Standard Data / States

   ---------------------------------------------------------- */
  const { id } = useParams();

  const moduleId = "edition";

  const requests = RequestFactory.getViewRequestsFor(moduleId, "ipc-database");

  /* ----------------------------------------------------------

    Standard View Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    Additional Actions

   ---------------------------------------------------------- */

  /* ----------------------------------------------------------

    View Render

   ---------------------------------------------------------- */
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
    segment: "editions",
    label: "Edition",
    fields: fieldsEdition,
    relationFilterIdField: "id",
    render: "description", // "description" | "table" | "component"
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentEditions];

  return (
      <MyBasicView
        id={id}
        moduleLabel="Edition"
        moduleId={moduleId}
        requests={requests}
        segmentSets={segmentSets}
      />
  );
}
export default EditionView;
