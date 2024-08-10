export type ConditionSelector = '$eq' | '$gt';
export type ConditionScope = "field" | "childs";
export type ConditionAction = "showif";

export interface ConditionParameter {
  scope: ConditionScope;
  field: string; // field (relation) with uuid
  selector: ConditionSelector;
  value: string;
  action: ConditionAction; // TODO condition - was zu tun ist.
}

export interface ConditionProperty {
  condition: ConditionParameter;
}
export class Condition {

  static check_condition(fieldDef: any, record: any, scope:ConditionScope):boolean {

    if (fieldDef !== null && 'condition' in fieldDef) {

      const condition:ConditionParameter = fieldDef.condition;

      // condition.action; // TODO das könnte auch ein Callback sein.

      if(condition.scope !== scope) return true; // geht mich nichts an, also zeige immer

      if (record[condition.field] === condition.value) {
        // console.log(`SHOW THIS FIELD 1: ${field.label}`);
      } else {
        // console.log(`HIDE THIS FIELD 2: ${field.label}`);
        return false;
      }
    } else {
      // console.log(`SHOW THIS FIELD 3: ${field.label}`);
    }

    return true; 

  }
  

  /**
   * Beispiel:
   *
   * fieldDef = { 
   *  ...
   *  condition:{ 
   *    scope:'field',
   *    field:'test',
   *    selector:'$eq'
   *    value:'uuid_wert'
   *  }
   * }
   * 
   * record = { 
   *  ...
   *  test:'uuid_wert'
   *  ...
   * }
   *
   * Liefert false, wenn der wert von record.test === fieldDef.condition.value ist,
   * Sonst true...
   *
   * TODO, das funktioniert zwar, ist aber von der Code-Logik noch was verdreht.
   * TODO Der selector '$eq' wird noch nicht wirklich benutzt...
   * TODO showif noch ordentlich ausbauen...
   *
   * https://pouchdb.com/api.html#query_index
   *
   * @param fieldDef Ein Objekt mit oder ohne 'condition' Property
   * @param record Ein Objekt mit Property mit dem Inhalt von field
   * @param scope Ignoriere die Bedingung wenn der Fokus nicht übereinstimmt.
   * @returns
   */
  public static showField(fieldDef: any, record: any, scope:ConditionScope): boolean {

    if (fieldDef !== null && 'condition' in fieldDef) {

      let condition:ConditionParameter = fieldDef.condition;

      if(condition.scope !== scope) return true; // geht mich nichts an, also zeige immer

      if (record[condition.field] === condition.value) {
        // console.log(`SHOW THIS FIELD 1: ${field.label}`);
      } else {
        // console.log(`HIDE THIS FIELD 2: ${field.label}`);
        return false;
      }
    } else {
      // console.log(`SHOW THIS FIELD 3: ${field.label}`);
    }

    return true;
  }
}
