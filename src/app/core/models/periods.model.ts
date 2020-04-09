import { Tax } from '.';

export class Period {
  id: string;
  year: string;
  companyMultiplier: number;
  tax: Array<Tax>;
  closed: boolean;
  closedMonth: number;
  createdAt: Date;
  updatedAt: Date;
}