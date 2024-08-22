/* eslint-disable react/jsx-no-bind */
import { useParams } from "react-router-dom";

//import RequestFactory from '../../../common/backend/RequestFactory';
import { MyBasicView } from "../../../frontend/myBasicView";

import {
  MyBasicViewFieldParameterI,
  MyBasicViewSegmentParameterI,
} from "../../../common/types/MyBasicViewTypes";
import { WhiteboardI } from "../../../common/types/DocWhiteboard";
import { modul_props } from "../modul_props";
import { Image_Cover2 } from "../../../frontend/Image_Cover";
import Paragraph from "antd/es/typography/Paragraph";
import { useState } from "react";
import { DB_RequestData } from "../../../common/types/RequestTypes";

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
export function WhiteboardView() {
  const { id } = useParams();

  const [editableName, setEditableName] = useState('');
  const [editableDescription, setEditableDescription] = useState('nix');

  function save_name(value:string, record: WhiteboardI):void{
    setEditableName(value);
    record.name = value;
    // TODO: Request save...
    console.log('SAVE THE VALUE', record, value);

    const request: DB_RequestData<WhiteboardI> = {
      type: "request:save",
      doctype: modul_props.doctype,
      id: record.id,
      data: record,
      options: {},
    };

    window.electronAPI
    .invoke_request("ipc-database", [request])
    .then((result: any) => {
      console.log(result);
      // Das ich hier beim speichern eine
      // neue ref bekomme kann ich ignorieren.
      // Wenn das ganze zum Bearbeiten geöffnet wird
      // lese ich eh neu?
      // Das dürfte beim zweiten schreibversuch schief gehen.
      // weil der record die falsche ref hat.
      // ich muss die Seite neu laden.
      window.location.reload();
    })


  }

  function save_description(value:string, record: WhiteboardI):void{
    setEditableDescription(value);
    record.description = value;
    // TODO: Request save...
    console.log('SAVE THE VALUE', record, value);

    const request: DB_RequestData<WhiteboardI> = {
      type: "request:save",
      doctype: modul_props.doctype,
      id: record.id,
      data: record,
      options: {},
    };

    window.electronAPI
    .invoke_request("ipc-database", [request])
    .then((result: any) => {
      console.log(result);
      // Das ich hier beim speichern eine
      // neue ref bekomme kann ich ignorieren.
      // Wenn das ganze zum Bearbeiten geöffnet wird
      // lese ich eh neu?
      // Das dürfte beim zweiten schreibversuch schief gehen.
      // weil der record die falsche ref hat.
      // ich muss die Seite neu laden.
      window.location.reload();
    })
  }

  const view_fields: MyBasicViewFieldParameterI<WhiteboardI>[] = [
    {
      dataIndex: "name",
      label: "Name",
      render: (text:string, record:WhiteboardI) => {
        setEditableName(text);
        return (<Paragraph key={'p_name'} editable={{ onChange: (value) => { save_name(value, record);} }}>{editableName}</Paragraph>)
      }
    },
    {
      dataIndex: "description",
      label: "Beschreibung",
      render: (text:string, record:WhiteboardI) => {
        setEditableDescription(text);
        return (<Paragraph key={'p_description'} editable={{ onChange: (value) => { save_description(value, record);} }}>{editableDescription}</Paragraph>)
      }
    },
    {
      dataIndex: "preview",
      label: "Vorschau",
      //! my own custom renderer following the andt concept.
      render: (text:string, record:WhiteboardI) => <Image_Cover2 image_string={text} ignore_size={true} />,
    },
  ];

  const segmentArtworks: MyBasicViewSegmentParameterI<WhiteboardI> = {
    segment: modul_props.segment,
    label: modul_props.doclabel,
    fields: view_fields,
    relationFilterIdField: "id",
    render: "description",
  };

  //* Das erste Segment ist der Master, und wird für die Navigation verwendet.
  const segmentSets: MyBasicViewSegmentParameterI<WhiteboardI>[] = [segmentArtworks];

  return (
    <MyBasicView<WhiteboardI>
      id={id}
      modul_props={modul_props}
      segmentSets={segmentSets}
    />
  );
}