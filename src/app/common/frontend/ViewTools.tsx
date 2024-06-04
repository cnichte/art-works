import { ReactElement } from "react";
import { Image } from 'antd';

import Markdown from "markdown-to-jsx";
import { v4 as uuidv4 } from "uuid";

import {
  MyBasicViewFieldParameterI,
  MyBasicView_ChildFieldParameterI,
} from "./types/MyBasicViewTypes";
import RelationResolver from "./RelationResolver";
import { AttachmentMeta } from "./types/AttachmentTypes";

/**
 * Map propertyName to antd required 'key' Propery.
 * Addresses: Warning Each child in a list should have a unique "key" prop.
 *
 * ViewTool.createKeyFieldFrom('dataIndex', segmentParams.fields);
 */
export default class ViewTool {
  public static createKeyFieldFrom(
    propertyName: string,
    segmentParamFields: any
  ) {
    if (segmentParamFields != null) {
      for (let x = 0; x < segmentParamFields.length; x += 1) {
        if (propertyName in segmentParamFields[x]) {
          segmentParamFields[x].key = segmentParamFields[x][propertyName];
        }
      }
    }
  }

  /**
   ** Besorge den Wert.
   *
   * Child Objekte - sofern vorhanden - sollen schick gerendert werden.
   * Relationen sollen dabei sauber aufgelöst werden.
   *
   * https://stackoverflow.com/questions/44046037/if-else-statement-inside-jsx-reactjs
   * @param param  { dataIndex: 'resumes', label: 'Lebenslauf', childs:{}, mapKeyTo:'prop' }
   * @returns
   */
  public static getMyFuckingValueFrom(
    param: MyBasicViewFieldParameterI,
    segment: string,
    record: any,
    data: any
  ): ReactElement {
    let result: ReactElement;

    // console.log('THE RECORD LOOKS LIKE: ', record);

    if (RelationResolver.heShallPass(param, segment, record, data)) {
      try {
        // value ist normal ein string, kann auch ein Array sein.
        // Es kann auch eine uuid oder ein Array von uuids.
        // ZB bei Edition.prices, Artist Resumes.
        const fuckingValue = record[param.dataIndex]; // Das ist der Normalfall: string

        if (Array.isArray(fuckingValue)) {
          //
          result = ViewTool.buildMyFuckingValue(
            param,
            segment,
            record,
            data,
            fuckingValue
          );
        } else {
          // Kein Array, sondern ein string oder objekt...
          // Der kann aber auch noch eine Relation
          // in Form einer uuid enthalten.
          if (RelationResolver.uuidValidateV4(fuckingValue)) {
            // resolve some uuids
            const objResolved = RelationResolver.resolve(
              data,
              param,
              fuckingValue
            );

            result = ViewTool.buildMyFuckingValue(
              param,
              segment,
              record,
              data,
              objResolved
            );
          } else {
            // String oder Objekt?
            if (ViewTool.is_string(fuckingValue)) {
              // Ein String wird als Markdown gerendert
              result = <Markdown>{fuckingValue}</Markdown>;
            } else {
              // Fallback: Objekt, das ich einfach mal als Json-String ausgebe.
              const stringified: string = JSON.stringify(fuckingValue);
              result = <span>{stringified}</span>;
            }
          }
        }
      } catch (fuckinErrors) {
        console.log(fuckinErrors);
      }
    } // heShallPass

    return result;
  }

  public static is_string(obj: any): boolean {
    try {
      return typeof obj === "string";
    } catch (error) {
      return false;
    }
  }

  /**
   * Rendert mir einen Wert, oder eine Liste von Werten.
   *
   * @list_meta list_meta MyBasicViewFieldParameterI
   * @param fuckingValue
   * @returns
   */
  public static buildMyFuckingValue(
    param: MyBasicViewFieldParameterI,
    segment: string,
    record: any,
    data: any,
    fuckingValue: any
  ): ReactElement {
    let result: ReactElement; // ######## OBJECT START:

    //* Alle rendern
    let fields: any[] = [];

    if (typeof fuckingValue === "string") return <span>{fuckingValue}</span>;

    if (Array.isArray(fuckingValue)) {
      // Wir rendern eine Liste
      // Wenn Childs in den Metadaten definiert sind
      // rendern wir die angegebenen Properties der Liste-Elemente als Unterliste, ansonsten als String.
      //* Nur die fields im Array rendern.

      if ("childs" in param) {
        //* Beispiel für childs siehe /modules/edition/frontend/editionView.tsx.
        result = ViewTool.build_list(fuckingValue, param.childs);
      } else {
        //* Kein childs property in params
        //* Beispiel Tags in /modules/artwork/frontend/artworkView.tsx

        // limit the child fields
        if ("mapKeyTo" in param) {
          // Hab ich bestimmte Felder im Sinn?
          // Hier prüfe ich auf MyBasicViewFieldMapToParameterI oder string
          // TODO Das ist unsauber geprüft...
          // weil instanceof MyBasicViewFieldMapToParameterI oder sowas geht nicht...
          if (typeof param.mapKeyTo === "string") {
            // Dann ist hier nur eine uuid angegeben und keine Felder, also werden alle gerendert.
          } else if ("showFields" in param.mapKeyTo) {
            fields = param.mapKeyTo.showFields;
          }
        }

        let s:string = "";
        let separator:string = ' | ';
        let images: ReactElement[] = [];

        Object.entries(fuckingValue).forEach(([theKey, theValue]) => {
          if (RelationResolver.uuidValidateV4(theValue)) {
            const objResolved = RelationResolver.resolve(data, param, theValue);
            if (typeof objResolved === "string") {
              s = s.concat(objResolved).concat(separator);
            } else {
              if (fields.length > 0) {
                // Hole alle gewünschten Felder aus dem Objekt.
                Object.entries(fields).forEach(([fieldKey, fieldValue]) => {
                  if (fieldValue in objResolved) {
                    s = s.concat(`${objResolved[fieldValue]}`);
                  } else {
                    console.log(
                      `Das Property ${fieldValue} befindet sich nicht im Objekt`,
                      objResolved
                    );
                  }
                });
              } else {
                s = JSON.stringify(objResolved);
              }
            }
          }else{
            // if(theValue instanceof AttachmentMeta){}
            // Das könnte so schön sein, funktoiniert aber nur
            // wenn es eine instanzierte Klasse ist
            // und nicht wenn es ein Objekt ist (glaube ich)
            // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#instanceof-narrowing
            if('category' in theValue) { //! Das ist ein Hack!
              // AttachmentMeta
              const fv = theValue as AttachmentMeta;
              // s = s.concat(`${fv.filename}`).concat(separator);

              if(fv.category === 'werk' && fv.is_cover){ // Image
                
                images.push(<Image width={200} src={fv.preview} />);
              }
            } else {
              s = s.concat(JSON.stringify(fuckingValue));
            }
          }
        }); // loop

        if(s.endsWith(separator)){
          s = s.substring(0, s.lastIndexOf(separator));
        }

        result = <>{s} 
        <Image.PreviewGroup>
        {images.map(i => i)}
        </Image.PreviewGroup>
        </>;
      }
    } // fuckingValue is Array

    return result;
  }

  /**
   * FuckingValue ist ein Array, aus dem ich gerne eine Liste bauen würde
   * @param list_meta
   * @param fuckingValue
   * @returns
   */
  public static build_list(
    fuckingValue: Array<any>,
    list_meta?: Array<MyBasicView_ChildFieldParameterI>
  ) {
    const list_elements = fuckingValue.map((listItem: any) => {
      let value: ReactElement;

      // const value: string = `${listItem.label}: ${fuckingValue[listItem.dataIndex]}`;
      if (list_meta != null) {
        value = ViewTool.build_child_list(list_meta, listItem);
      } else {
        let r: string = "";

        Object.entries(fuckingValue).forEach(([theKey, theValue]) => {
          r = r.concat(`${theKey}:'${theValue}', `);
        });

        value = <>{r}</>;

        // const test:string = JSON.stringify(listItem);
        // value = <span>{test}</span>
      }

      return <>{value}</>;
    });

    return <>{list_elements}</>;
  }

  public static build_child_list(
    list_meta: Array<MyBasicView_ChildFieldParameterI>,
    fuckingValue: any
  ) {
    const list_elements = list_meta.map(
      (listItem: MyBasicView_ChildFieldParameterI) => {
        const value: string = `${listItem.label}: ${
          fuckingValue[listItem.dataIndex]
        }`;
        return <li key={uuidv4()}>{value}</li>;
      }
    );

    return <ul>{list_elements}</ul>;
  }
}
