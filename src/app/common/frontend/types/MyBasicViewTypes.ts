/* eslint-disable react/jsx-no-bind */
import { RequestViewI } from '../../backend/types/RequestsFactoryTypes';
import { ConditionParameter } from '../Condition';

/** Zusatz für mapKeyTo
 * Die Realation kann ich entweder mit einem String auflösen der das Ziel angibt,
 * dann wird alles in diesem Datensatz angezeigt, oder
 * ich filtere auf ein Feld oder mehrere Felder des Ziels, die ich angezeigt haben will. */
interface MyBasicViewFieldMapToParameterI {
  dataIndex: string;
  showFields: string[];
}

//! Warning Each child in a list should have a unique "key" prop.
// I map the dataindex to the key field where needed.

type myBasicViewType = 'description' | 'table' | 'component';

interface MyBasicViewFieldParameterI {
  dataIndex: string; // required for Table
  key?: string; // required for Lists / Descriptions
  label: string;
  mapKeyTo?: string | MyBasicViewFieldMapToParameterI;
  condition?: ConditionParameter;
  useChilds?: string[];
}

interface MyBasicViewSegmentParameterI {
  segment: string;
  label: string;
  relationFilterIdField: string;
  render: myBasicViewType;
  fields?: Array<MyBasicViewFieldParameterI>;
  component?: any;
}

/**
 * Parameter für MyBasicView.
 */
interface MyBasicViewPropertiesI {
  id: string;
  moduleLabel: string;
  moduleId: string;
  requests: RequestViewI;
  segmentSets: Array<MyBasicViewSegmentParameterI>;
}

export {
  myBasicViewType,
  MyBasicViewPropertiesI,
  MyBasicViewSegmentParameterI,
  MyBasicViewFieldParameterI,
  MyBasicViewFieldMapToParameterI,
};