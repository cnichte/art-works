// type selector: string = '$eq' | '$gt';

export type ConditionScope = "field" | "childs";

interface ConditionParameter {
  scope: ConditionScope;
  field: string; // field (relation) with uuid
  selector: string;
  value: string;
  action: string; // TODO condition - was zu tun ist.
}

interface ConditionProperty {
  condition: ConditionParameter;
}

class Condition {
  /**
   * https://pouchdb.com/api.html#query_index
   * @param obj
   * @param forField
   * @param selector
   * @param compareValue
   * @returns
   */
  public static addConditionTo(
    scope: ConditionScope,
    obj: any,
    forField: string,
    selector: string,
    compareValue: string
  ) {
    // Es gibt momentan nur eine Condition
    const theCondition: ConditionParameter = {
      scope: scope,
      field: forField,
      selector,
      value: compareValue,
      action: 'showif',
    };

    obj.condition = theCondition;

    return obj;
  }

  /**
   *
   * Beispiel:
   *
   * fieldDef = { condition:{ scope:'field', field:'test', selector:'$eq' value:'uuid_wert' }}
   * record = { test:'uuid_wert' }
   *
   * Liefert false, wenn der wert von record.test === fieldDef.condition.value ist.
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

export { Condition, ConditionProperty, ConditionParameter };
