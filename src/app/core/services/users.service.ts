import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { User } from "../models";

@Injectable()
export class UsersService {
  constructor(
    private apiService: ApiService
  ) {}

  query(): Observable<User[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/users', params).pipe(
      map(data => data.users)
    );
  }

  get(id): Observable<User> {
    return this.apiService.get('/users/' + id).pipe(
      map(data => data.user)
    )
  }

  save(user: User): Observable<User> {
    // if is updating
    if (user.id) {
      console.log('put');
      return this.apiService.put('/users/' + user.id, { user: user }).pipe(
        map(data => data.user)
      );
    } else { // if is creating
      return this.apiService.post('/users/', { user: user }).pipe(
        map(data => data.user)
      );
    }
  }

  destroy(id): Observable<any> {
    return this.apiService.delete('/users/' + id);
  }

}