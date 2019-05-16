import { Department } from "./departments.model";

export class User {
  id: string;
  name: string;
  email: string;
  department: Department;
  role: string;
  inactive: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastAccess: Date;
}