import { RequestsFormI } from '../../backend/types/RequestsFactoryTypes';

/**
 * Das ist der Kontrakt zwischen dem antd-Formular
 * und untergeordneten selbstgebauten Input-Elementen.
 * Der muss erfüllt sein, damit Werte zwischen Formular und Input
 * ausgetauscht werden können.
 * 
 * 'value' and 'onChange' must necessarily be called exactly that,
 * because they are used by the parent Andt Form.Item.
 *! Dont rename them.
 * 
 * id ist optional wenn man listen sortiereen will
 * 
 * <Form.Item label="Field" name="field">
 *   <MyInput />
 * </Form.Item>
 * 
 * 
 * @see https://ant.design/components/form
 */
 export interface FormItem_Props<T> {
  id?:string;
  value?: T;
  onChange?: (value: T) => void;
}

/**
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @interface FormPropertiesInterface
 */
export interface FormPropertiesInterface {
  id: string;
  moduleLabel: string;
  moduleId: string;
  requests: RequestsFormI;
  segment: string;
}