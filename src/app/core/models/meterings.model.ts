import { Indicator } from "./indicators.model";
import { Period } from "./periods.model";

export class Metering {
  id: string;
  indicator: Indicator;
  period: Period;
  refOrder: string;
  refName: string;
  target: Number;
  actual: Number;
  difference: Number;
  percent: Number;
  createdAt: Date;
  updatedAt: Date;
}