import { EditionPriceI } from '../types/EditionPriceInterface';

export interface EditionI {
  // System
  id: string; // _id: string;
  docType: string;
  docScope: string;

  // Userdata
  name: string;
  description: string;
  edition: number;
  artistsPrint: number;
  prices: EditionPriceI[];
  shortnote: string;

  // Userdata, Relations
  editionType: string;
  artworks: string[];
  sales: string[];
  notes: string[];
}
