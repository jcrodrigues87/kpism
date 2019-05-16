import { Indicator } from "./indicators.model";
import { Period } from "./periods.model";
import { User } from "./users.model";

export class Responsable {
  id: string;
  indicator: Indicator;
  period: Period;
  user: User;
  createdAt: Date;
  updatedAt: Date;
}