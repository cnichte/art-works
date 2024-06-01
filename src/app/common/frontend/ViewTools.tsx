import { ReactElement } from "react";
import Markdown from 'markdown-to-jsx';

import {
  MyBasicViewFieldParameterI,
  MyBasicView_ChildFieldParameterI,
} from "./types/MyBasicViewTypes";
import RelationResolver from "./RelationResolver";
import { v4 as uuidv4 } from 'uuid';

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
    if(segmentParamFields!=null){
      for (let x = 0; x < segmentParamFields.length; x += 1) {
        if(propertyName in segmentParamFields[x]){
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

          result = ViewTool.buildMyFuckingValue(param, fuckingValue);

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

            result = ViewTool.buildMyFuckingValue(param, objResolved);

          } else {
            // String oder Objekt?
            if(ViewTool.is_string(fuckingValue)){
              // Ein String wird als Markdown gerendert
              result = <Markdown>{fuckingValue}</Markdown>;
            }else {
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

  public static is_string(obj:any):boolean {
      try {
        return typeof obj === 'string';
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

      // TODO Das resolven von UUIDs müsste noch erfolgen...
      result = ViewTool.build_list(fuckingValue, param.childs);
    } // fuckingValue is Array

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

    let x: string = "";
    if (fields.length > 0) {
      // Nur die gewünschten Felder.
      // TODO bei mehreren Feldern könnte ich in den Params MyBasicViewFieldMapToParameterI
      // ein Template angeben mit Platzhaltern, das bestimmt wie die Inhalte verknüpft / gerendert werden.
      Object.entries(fields).forEach(([theKey, theValue]) => {
        x = x.concat(`${fuckingValue[theValue]}`);
      });
      result = <span>{x}</span>;
    } else {
      /*
       Object.entries(fuckingValue).forEach(([theKey, theValue]) => {
        x = x.concat(`${theKey}:'${theValue}', `);
      });

      result = <span>{x}</span>
      */
    }

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

        value = <span>{r}</span>;
        // const test:string = JSON.stringify(listItem);
        // value = <span>{test}</span>
      }

      return <li  key={uuidv4()}>Edition {value}</li>;
    });

    return <ul>{list_elements}</ul>;
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
