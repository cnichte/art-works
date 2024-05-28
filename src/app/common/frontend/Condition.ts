// type selector: string = '$eq' | '$gt';

interface ConditionParameter {
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
    obj: any,
    forField: string,
    selector: string,
    compareValue: string
  ) {
    // Es gibt momentan nur eine Condition
    const theCondition: ConditionParameter = {
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
   * fieldDef = { condition:{ field:'test', selector:'$eq' value:'uuid_wert' }}
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
   * @returns
   */
  public static showField(fieldDef: any, record: any): boolean {
    if (fieldDef !== null && 'condition' in fieldDef) {
      if (record[fieldDef.condition.field] === fieldDef.condition.value) {
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
