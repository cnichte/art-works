/* eslint-disable class-methods-use-this */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/prefer-default-export */
// https://www.npmjs.com/package/uuid
import {
  version as uuidVersion,
  validate as uuidValidate,
  v4 as uuidv4,
} from 'uuid';
// import { MyBasicViewFieldMapToParameterI } from '../../types/MyBasicViewParameter';

/**
 * taucht die ID im Content auf.
 * Das Feld ist entweder ein string (mit der UUID, oder ein array mit vielen uuids)
 */
export default class RelationResolver {
  /**
   * Checks a string to see if it is a valid uuid.
   *
   * @param theString Der zu prüfende String.
   * @returns true, wenn valide., false wenn nicht.
   */
  public static uuidValidateV4(theString: string): boolean {
    return uuidValidate(theString) && uuidVersion(theString) === 4;
  }

  /**
   * A field contains a uuid, or an array of uuids.
   * I am of course interested in whether my ID is in it or not.
   *
   * @param id
   * @param fieldContent
   * @returns
   */
  public static isIdRelatedTo(
    id: string,
    fieldContent: Array<string> | string
  ): boolean {
    let result = false;

    if (RelationResolver.uuidValidateV4(id)) {
      // console.log(`WARNING: id ist not a valid uuid`, id);
      // console.log(`use uuid ${uuidv4()} instead of ${id}`);
    }

    if (Array.isArray(fieldContent)) {
      for (let z = 0; z < fieldContent.length; z += 1) {
        // taucht die ID im Array auf?
        if (RelationResolver.uuidValidateV4(fieldContent[z])) {
          // console.log(`WARNING: fieldContent[${z}] ist not a valid uuid`,fieldContent[z]);
          // console.log(`use uuid ${uuidv4()} instead of ${fieldContent[z]}`);
        }
        if (id === fieldContent[z]) {
          result = true;
          break;
        }
      }
    } else {
      if (RelationResolver.uuidValidateV4(fieldContent)) {
        // console.log(`WARNING: fieldContent ist not a valid uuid`, fieldContent);
        // console.log(`use uuid ${uuidv4()} instead of ${fieldContent}`);
      }
      if (id === fieldContent) {
        result = true;
      }
    }
    return result;
  }

  /**
   * The Gatekeeper. Pre-checks whether the data structure is complete.
   * If there are errors, we don't need to continue.
   * TODO record! einige Prüfungen gehen hier nicht mehr
   * @param param
   * @param segment
   * @param data
   */
  public static heShallPass(
    param: any,
    segment: string,
    record: any,
    data: any
  ): boolean {
    // The segment does not exist: data[segment].
    // This should not actually occur,
    // unless the data has not (yet) been loaded from the backend.
    if (!(segment in data)) {
      console.log(
        `Ich hab das Property ${segment} nicht in data gefunden. Vermutlich wurden noch keine Daten geladen.`,
        data
      );
      return false;
    }
    // The key (in the example 'resumes') does not exist in the data.
    // Maybe I made a mistake?
    // param={ key: 'resumes', label: 'Stadt',... }
    if (!(param.key in record)) {
      console.log(
        `FATAL: Ich hab das Property ${param.key} nicht in data[${segment}][0] gefunden:`,
        data[segment][0]
      );
      return false;
    }

    // param.key= resumes
    if (record[param.key] === undefined) {
      console.log(
        `FATAL: data[${segment}][0][${param.key}] is undefined`,
        record[param.key]
      );
      return false;
    }

    return true;
  }

  /**
   * If a mapping cannot be resolved, then it has not been correctly created in the database.
   *
   * TODO record!
   *
   * @param params
   * @param element
   * @param data
   * @returns string ? eigentliche Ziel uuid ?
   */
  public static resolveMapping_Key(params: any, element: any, data: any): string {
    let result = params.key;

    if (params.key in data) {
      // tu nix, alles super
    } else if ('mapKeyTo' in params) {
      // Hier prüfe ich auf MyBasicViewFieldMapToParameterI oder string
      // TODO Das ist unsauber geprüft...
      // weil instanceof MyBasicViewFieldMapToParameterI oder sowas geht nicht...
      if (typeof params.mapKeyTo === 'string') {
        result = params.mapKeyTo;
      } else {
        result = params.mapKeyTo.dataIndex;
      }
    } else {
      console.log(
        `Achtung! Ich kann die Relation ${params.key} = ${element} nicht auflösen. Erwarte ein Property ${params.key} in data, oder ein {mapKeyTo: '...'}`,
        data
      );
    }

    return result;
  }

  public static resolveMapping_Name(params:any, elm:any): string {
    let result = elm;
    const delimiter = ' |';
    if ('mapKeyTo' in params) {
      let s:string ="";

      for (let prop_name of params.mapKeyTo.showFields) {
        if ( prop_name in elm) {
          s = s.concat(elm[prop_name]).concat(delimiter);
        }
      }


      result = s.substring(0, s.lastIndexOf(delimiter));
    } else {
      console.log(
        `Achtung! Ich kann die Relation params.mapKeyTo.showFields nicht auflösen. Property mapKeyTo fehlt`,
        params, elm
      );
    }



    return result;
  }

  /**
   * Resolves a relational-pouch mapping.
   * A field contains a uuid, or an array of uuids.
   * I am of course interested in the actual content.
   *
   * data:
   * {artists:[{ id:'uuid0', ..., resumes:['uuid1','uuid2','uuid3']...},...]},
   * {resumes:[{ id:'uuid0'},{ id:'uuid1'}, ...   ]},
   *
   *  in dem Fall: resumes
   * TODO record!
   *
   * @param data
   * @param params - {}
   * @param element
   * @returns
   */
  public static resolve(data: any, params: any, element: string): string {
    let result:string = JSON.stringify(element);

    if (RelationResolver.uuidValidateV4(element)) {
      // TODO Das Element ist eine UUID. Relation auflösen.
      // console.log(`RELATION AUFLÖSEN ${params.key} = ${element} `);
      // console.log(`Parameter `, params);

      // Finde das Item...
      const key = RelationResolver.resolveMapping_Key(params, element, data);

      if (key in data) {
        for (const elm of data[key]) {
          if (elm.id === element) {
            // console.log(`gefunden!`, elm);
            // Das Element aus dem Objekt holen
            result = RelationResolver.resolveMapping_Name(params, elm);
            break;
          }
        }
      } else {
        result = 'could not resolve: '.concat(result);
      }
    } else {
      console.log(`Tja, ${params.key} ist keine Relation (keine uuid).`);
      console.log(`use uuid ${uuidv4()} instead of params.key}:${params.key}`);
    }

    return result;
  }
}
