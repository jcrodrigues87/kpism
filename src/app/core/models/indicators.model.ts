import { Department } from "./departments.model";
import { Metering } from "./meterings.model";

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
  metering: Array<Metering>;
  accumulated: Metering;
  basket: boolean;
  createdAt: Date;
  updatedAt: Date;
}