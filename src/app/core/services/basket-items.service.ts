import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { BasketItem, Basket, Indicator } from "../models";

@Injectable()
export class BasketItemsService {
  constructor(
    private apiService: ApiService
  ) {}
  
  get(indicatorRefId): Observable<Basket> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/baskets/' + indicatorRefId, params).pipe(
      map(data => data.basket)
    );
  }
  
  put(indicatorRefId, indicators: Array<BasketItem>): Observable<BasketItem> {
    return this.apiService.put('/baskets/' + indicatorRefId, { indicators: indicators }).pipe(
      map(data => data.basket)
    );
  }

  destroy(indicatorRefId, indicatorId): Observable<any> {
    return this.apiService.delete('/baskets/' + indicatorRefId + '/' + indicatorId);
  }



  set(indicatorRefId, indicatorId, weight): Observable<BasketItem> {
    return this.apiService.post('/indicators/' + indicatorRefId + '/basketItems/' + indicatorId + '/' + weight).pipe(
      map(data => data.basketItem)
    );
  }

}