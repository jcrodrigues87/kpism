import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { Responsable } from "../models";

@Injectable()
export class ResponsablesService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(indicatorId, periodId): Observable<Responsable[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/indicators/' + indicatorId + '/responsables/' + periodId, params).pipe(
      map(data => data.responsables)
    );
  }
  
  set(indicatorId, periodId, userId): Observable<Responsable> {
    return this.apiService.post('/indicators/' + indicatorId + '/responsables/' + periodId + '/' + userId).pipe(
      map(data => data.responsable)
    );
  }

  destroy(indicatorId, periodId, userId): Observable<any> {
    return this.apiService.delete('/indicators/' + indicatorId + '/responsables/' + periodId + '/' + userId);
  }
}