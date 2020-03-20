import { Department } from "./departments.model";

export class Indicator {
  id: string;
  name: string;
  description: string;
  department: Department;
  measure: string;
  accumulatedType: string;
  orientation: string;
  classification: string;
  limit: number;
  basket: boolean;
  createdAt: Date;
  updatedAt: Date;
}