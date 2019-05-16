import { User } from "./users.model";

export class Department {
  id: string;
  name: string;
  description: string;
  manager: User;
  childOf: Department;
  createdAt: Date;
  updatedAt: Date;
}