import { useParams } from "react-router-dom";

import { Tldraw } from "tldraw";
import "tldraw/tldraw.css";

import { My_Tldraw_PersistenceManager } from "./my_Tldraw_PersistenceManager";
import { DocType } from "../../../common/types/DocType";
import { modul_props } from "../modul_props";

/**
 * Wrapper for Tldraw.
 * 
 * The "load and save" logic has to be inside Tldraw component,
 * so i moved it there: My_Tldraw_PersistenceManager
 * 
 * @returns <Tldraw />
 */
export function WhiteboardForm() {

  const doclabel: string = modul_props.doclabel;
  const doctype: DocType = modul_props.doctype;
  // const segment: string =  modul_props.segment;

  const { id } = useParams();

  return (
    <Tldraw>
      <My_Tldraw_PersistenceManager id={id} doctype={doctype} doclabel={doclabel} />
    </Tldraw>
  );
}