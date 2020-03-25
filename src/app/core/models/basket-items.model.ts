import { Indicator } from "./indicators.model";

export class BasketItem {
  id: string;
  indicator: Indicator;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}