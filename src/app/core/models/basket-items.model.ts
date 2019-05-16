import { Indicator } from "./indicators.model";

export class BasketItem {
  id: string;
  indicator: Indicator;
  weight: Number;
  createdAt: Date;
  updatedAt: Date;
}