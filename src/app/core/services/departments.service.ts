import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { Department } from "../models";

@Injectable()
export class DepartmentsService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(): Observable<Department[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/departments', params).pipe(
      map(data => data.departments)
    );
  }

  get(id): Observable<Department> {
    return this.apiService.get('/departments/' + id).pipe(
      map(data => data.department)
    )
  }

  save(department: Department): Observable<Department> {
    // if is updating
    if (department.id) {
      return this.apiService.put('/departments/' + department.id, { department: department }).pipe(
        map(data => data.department)
      );
    } else { // if is creating
      return this.apiService.post('/departments/', { department: department }).pipe(
        map(data => data.department)
      );
    }
  }

  destroy(id): Observable<any> {
    return this.apiService.delete('/departments/' + id);
  }
}