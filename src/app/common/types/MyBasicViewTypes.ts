/* eslint-disable react/jsx-no-bind */
// import { RequestViewI } from '../../backend/types/RequestsFactoryTypes';
import { ConditionParameter } from '../../frontend/Condition';
import { Modul_Props_I } from '../Modul_Props';

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
type myBasicViewChildsType = 'list' | 'string';

interface MyBasicViewFieldParameterI<T> {
  dataIndex: string; // required for Table
  key?: string; // required for Lists / Descriptions
  label: string;
  mapKeyTo?: string | MyBasicViewFieldMapToParameterI;
  condition?: ConditionParameter;
  useChilds?: string[]; // Wird in Tags verwendet
  childs_render?:myBasicViewChildsType, // render_type: list, string
  childs?:MyBasicView_ChildFieldParameterI[] // TODO siehe editionView

  render?: (text:string, record: T) => any; // ReactElement
}

interface MyBasicView_ChildFieldParameterI {
  dataIndex: string; // required for Table
  label: string;
  condition?: ConditionParameter;
}

interface MyBasicViewSegmentParameterI<T> {
  segment: string;
  label: string;
  relationFilterIdField: string;
  render: myBasicViewType;
  fields?: Array<MyBasicViewFieldParameterI<T>>;
  component?: any;
}

/**
 * Parameter für MyBasicView.
 */
interface MyBasicViewProps<T> {
  id: string;
  modul_props: Modul_Props_I;
//  requests: RequestViewI;
  segmentSets: Array<MyBasicViewSegmentParameterI<T>>; //
}

export {
  myBasicViewType,
  MyBasicViewProps,
  MyBasicViewSegmentParameterI,
  MyBasicViewFieldParameterI,
  MyBasicView_ChildFieldParameterI,
  MyBasicViewFieldMapToParameterI,
};
