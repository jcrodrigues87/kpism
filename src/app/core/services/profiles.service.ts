import { Injectable } from "@angular/core";
import { HttpParams } from "@angular/common/http";

import { Observable } from "rxjs";
import { map } from "rxjs/operators";

import { ApiService } from "./api.service";
import { User } from "../models";

@Injectable()
export class ProfilesService {
  constructor(
    private apiService: ApiService
  ) {}
  
  query(): Observable<User[]> {
    let params: HttpParams = new HttpParams();

    return this.apiService.get('/profiles', params).pipe(
      map(data => data.users)
    );
  }

  get(id): Observable<User> {
    return this.apiService.get('/profiles/' + id).pipe(
      map(data => data.user)
    )
  }

  save(profile: User): Observable<User> {
    return this.apiService.put('/profiles/' + profile.id, { profile: profile }).pipe(
      map(data => data.user)
    );
  }
}