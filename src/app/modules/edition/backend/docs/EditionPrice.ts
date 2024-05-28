/* eslint-disable import/no-cycle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable import/prefer-default-export */
import { JSONableI } from '../../../../common/backend/types/JSONableInterface';
import { EditionPriceI } from '../../types/EditionPriceInterface';

/**
 * Für die Preise gibt es kein eigenes JSON-Dokument in der Datenbank.
 * Sie werden direkt im Edition-Dokument gespeichert.
 * Interface und Objekt benutze ich im Frontend / Formular.
 */
export class EditionPrice implements EditionPriceI, JSONableI {
  id: string = '';

  // Userdata
  name: string = '';

  numberStart: number = 0;

  numberEnd: number = 0;

  price: number = 0;

  sales: string[] = [];

  /**
   * Erzeugt ein sauberes JSON-Objekt aus den Properties dieser Klasse.
   *
   * @returns Ein sauberes JSON-Objekt.
   */
  toJson(): EditionPriceI {
    return {
      // eslint-disable-next-line no-underscore-dangle
      id: this.id,
      name: this.name,
      numberStart: this.numberStart,
      numberEnd: this.numberEnd,
      price: this.price,
      sales: this.sales,
    };
  }
}
