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
  
  put(indicatorRefId, basketItems: Array<BasketItem>): Observable<BasketItem> {
    for (var i = 0; i < basketItems.length; i++) {  
      // @ts-ignore
      basketItems[i].indicator = basketItems[i].indicator.id; // BasketItem have an entire indicator, but API just receive the indicator ID
    }
    return this.apiService.put('/baskets/' + indicatorRefId, { basketItems: basketItems }).pipe(
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