import { Department } from "./departments.model";

export class Indicator {
  id: string;
  name: string;
  description: string;
  department: Department;
  measure: string;
  accumulatedType: string;
  createdAt: Date;
  updatedAt: Date;
}