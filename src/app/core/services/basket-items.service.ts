import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { BasketItem } from "../models";

@Injectable()
export class BasketItemsService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(indicatorRefId): Observable<BasketItem[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/indicators/' + indicatorRefId + '/basketItems', params).pipe(
      map(data => data.basketItems)
    );
  }
  
  set(indicatorRefId, indicatorId, weight): Observable<BasketItem> {
    return this.apiService.post('/indicators/' + indicatorRefId + '/basketItems/' + indicatorId + '/' + weight).pipe(
      map(data => data.basketItem)
    );
  }

  destroy(indicatorRefId, indicatorId): Observable<any> {
    return this.apiService.delete('/indicators/' + indicatorRefId + '/basketItems/' + indicatorId);
  }
}