import { MyBasicViewFieldParameterI } from './types/MyBasicViewTypes';
import RelationResolver from './RelationResolver';

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
    for (let x = 0; x < segmentParamFields.length; x += 1) {
      segmentParamFields[x].key = segmentParamFields[x][propertyName];
    }
  }

  /**
   * Rendert testweise alles zu nem String zusammen.
   *
   * @param param MyBasicViewFieldParameterI
   * @param obj
   * @returns
   */
  public static buildMyFuckingValue(
    param: MyBasicViewFieldParameterI,
    obj: any
  ): string {
    let result = ''; // ######## OBJECT START:

    //* Alle rendern
    let fields:any[] = [];

    if (typeof obj === 'string') return obj;

    // limit the child fields
    if ('useChilds' in param) {
      //* Nur die fields im Array rendern.
      Object.entries(param.useChilds).forEach(([theKey, theValue]) => {
        const v = obj[theValue];
        result = result.concat(`${theValue}:'${v}', `);
      });
    } else if ('mapKeyTo' in param) {
      // Hab ich bestimmte Felder im Sinn?
      // Hier prüfe ich auf MyBasicViewFieldMapToParameterI oder string
      // TODO Das ist unsauber geprüft...
      // weil instanceof MyBasicViewFieldMapToParameterI oder sowas geht nicht...
      if (typeof param.mapKeyTo === 'string') {
        // Dann ist hier nur eine uuid angegeben und keine Felder, also werden alle gerendert.
      }else if ('showFields' in param.mapKeyTo) {
        fields = param.mapKeyTo.showFields;
      }
    }

    if (fields.length > 0) {
      // Nur die gewünschten Felder.
      // TODO bei mehreren Feldern könnte ich in den Params MyBasicViewFieldMapToParameterI
      // ein Template angeben mit Platzhaltern, das bestimmt wie die Inhalte verknüpft / gerendert werden.
      Object.entries(fields).forEach(([theKey, theValue]) => {
        result = result.concat(`${obj[theValue]}`);
      });
    } else {
      Object.entries(obj).forEach(([theKey, theValue]) => {
        result = result.concat(`${theKey}:'${theValue}', `);
      });
    }

    return result;
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
  ): string {
    let result = '';

    // console.log('THE RECORD LOOKS LIKE: ', record);

    if (RelationResolver.heShallPass(param, segment, record, data)) {
      // TODO record

      // console.log('######## THE RECORD', record);

      try {
        const fuckingValue = record[param.dataIndex];

        result = fuckingValue; // Das ist der Normalfall

        // value ist normal ein string, kann auch ein Array sein.
        // Es kann auch eine uuid oder ein Array von uuids.
        // ZB bei Edition.prices, Artist Resumes.
        if (Array.isArray(fuckingValue)) {
          // und dann den Content jedes Objekts zerlegen in Key:Value

          let buildResult = '';

          fuckingValue.forEach((element) => {
            const objResolved = RelationResolver.resolve(data, param, element);

            // Hier wird die eigentliche Ausgabe gebastelt: Ein unschöner string.
            buildResult = buildResult.concat(
              ViewTool.buildMyFuckingValue(param, objResolved)
            );
          });

          result = buildResult;
        } else {
          // Kein Array, sondern ein string oder objekt...
          // Der kann aber auch noch eine Relation
          // in Form einer uuid enthalten.
          // eslint-disable-next-line no-lonely-if
          if (RelationResolver.uuidValidateV4(fuckingValue)) {
            const objResolved = RelationResolver.resolve(
              data,
              param,
              fuckingValue
            );

            // Hier wird die eigentliche Ausgabe gebastelt: Ein unschöner string.
            result = ViewTool.buildMyFuckingValue(param, objResolved);
          } else {
            // oder objekt, das ich einfach mal als Json-String ausgebe
            result = JSON.stringify(fuckingValue);
          }
        }
      } catch (fuckinErrors) {
        console.log(fuckinErrors);
      }
    } // heShallPass

    return result;
  }
}
