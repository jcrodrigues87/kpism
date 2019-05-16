import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { Reference } from "../models";

@Injectable()
export class ReferencesService {
  constructor(
    private apiService: ApiService
  ) {}
  
  get(periodId): Observable<Reference[]> {
    return this.apiService.get('/periods/' + periodId + '/references').pipe(
      map(data => data.references)
    );
  }
}