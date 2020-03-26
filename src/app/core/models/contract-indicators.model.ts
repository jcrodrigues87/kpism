import { Period, User } from '.';
import { Indicator } from './indicators.model';

export class ContractIndicator {
  id: string;
  user: string;
  contract: string;
  indicator: Indicator;
  weight: number;
  createdAt: Date;
  updatedAt: Date;
}