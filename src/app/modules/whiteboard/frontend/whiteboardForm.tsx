import { useParams } from "react-router-dom";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { My_Tldraw_PersistenceManager } from "./my_Tldraw_PersistenceManager";
import { DocType } from "../../../common/types/DocType";

/**
 * Wrapper for Tldraw.
 * 
 * The "load and save" logic has to be inside Tldraw component,
 * so i moved it there: My_Tldraw_PersistenceManager
 * 
 * @returns <Tldraw />
 */
function WhiteboardForm() {

  const doctype: DocType = "whiteboard";
  const { id } = useParams();

  return (
    <Tldraw>
      <My_Tldraw_PersistenceManager id={id} doctype={doctype} />
    </Tldraw>
  );
}

export default WhiteboardForm;
