import { RequestsFormI } from '../../backend/types/RequestsFactoryTypes';

/**
 *
 * @author Carsten Nichte - //carsten-nichte.de/apps/
 * @export
 * @interface FormPropertiesInterface
 */
export default interface FormPropertiesInterface {
  id: string;
  moduleLabel: string;
  moduleId: string;
  requests: RequestsFormI;
  segment: string;
}
