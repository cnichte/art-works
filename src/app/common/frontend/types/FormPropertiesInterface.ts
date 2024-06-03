import { RequestsFormI } from '../../backend/types/RequestsFactoryTypes';

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

/**
 * Das ist der Kontrakt zwischen dem antd-Formular
 * und untergeordneten selbstgebauten Input-Elementen.
 * Der muss erfüllt sein, damit Werte zwischen Formular und Input
 * ausgetauscht werden können.
 * 
 * <Form.Item label="Field" name="field">
 *   <MyInput />
 * </Form.Item>
 * 
 * TODO bitte überall verwenden!
 * 
 * @see https://ant.design/components/form
 */
export interface Props_FormItem<T> {
  value?: T;
  onChange?: (value: T) => void;
}