/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

//import RequestFactory from '../../../common/backend/RequestFactory';
import MyBasicView from "../../../frontend/myBasicView";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { IPC_DATABASE } from "../../../common/types/IPC_Channels";
import { useContext, useEffect, useState } from "react";
import { Header_Buttons_IPC } from "../../../frontend/Header_Buttons_IPC";
import { DB_Request } from "../../../common/types/RequestTypes";
import { DocType } from "../../../common/types/DocType";
import {
  DocWhiteboard,
  WhiteboardI,
} from "../../../common/types/DocWhiteboard";
import { App_Messages_IPC } from "../../../frontend/App_Messages_IPC";
import { Action_Request } from "../../../common/types/RequestTypes";
import { DOCTYPE_WHITEBOARD } from "../../../common/types/DocType";
import { App_Context } from "../../../frontend/App_Context";

/* ==========================================================

    * ReactNode: ArtworkView

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
 * @returns ArtworkView
 */
function WhiteboardView() {
  const { id } = useParams();
  const app_context = useContext(App_Context);

  const [dataObject, setDataObject] = useState<DocWhiteboard>(null);

  const doctype: DocType = "whiteboard";
  const docLabel: string = "Whiteboard";

  const fieldsArtwork: MyBasicViewFieldParameterI[] = [
    {
      dataIndex: "name",
      label: "Name",
    },
    {
      dataIndex: "preview",
      label: "Vorschau",
    },
  ];

  const segmentArtworks: MyBasicViewSegmentParameterI = {
    segment: "whiteboards",
    label: "Whiteboard",
    fields: fieldsArtwork,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI[] = [segmentArtworks];

  return (
    <MyBasicView<WhiteboardI>
      id={id}
      doclabel="Whiteboard"
      doctype={doctype}
      segmentSets={segmentSets}
    />
  );
}
export default WhiteboardView;
