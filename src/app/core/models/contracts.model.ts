import { Period, User } from '.';

export class Contract {
  id: string;
  period: Period;
  user: User;
  salary: number;
  proportionalPeriod: number;
  bonus: number;
  qualitative: number;
  quantitative: number;
  resultContract: number;
  plr: number;
  tax: number;
  finalPlr: number;
  createdAt: Date;
  updatedAt: Date;
}