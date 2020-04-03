import { Department } from '.';

export class AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  department: Department;
  token: string;
}