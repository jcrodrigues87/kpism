import { Indicator } from "./indicators.model";
import { BasketItem } from './basket-items.model';

export class Basket {
  id: string;
  indicatorRef: Indicator;
  basketItems: Array<BasketItem>;
  createdAt: Date;
  updatedAt: Date;
}