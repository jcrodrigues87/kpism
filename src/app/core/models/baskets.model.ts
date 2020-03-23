import { Indicator } from "./indicators.model";
import { BasketItem } from './basket-items.model';

export class Basket {
  id: string;
  indicatorRef: Indicator;
  indicators: Array<BasketItem>;
  createdAt: Date;
  updatedAt: Date;
}