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

  // query(config: ArticleListConfig): Observable<{articles: Article[], articlesCount: number}> {
  //   let params: HttpParams = new HttpParams();

  //   Object.keys(config.filters).forEach(key => {
  //     params.set(key, config.filters[key]);
  //   });

  //   return this.apiService.get('/articles' + ((config.type === 'feed') ? '/feed' : ''), params).pipe(
  //     map(data => data)
  //   );
  // }

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

  // favorite(slug): Observable<Article> {
  //   return this.apiService.post('/articles/' + slug + '/favorite');
  // }

  // unfavorite(slug): Observable<Article> {
  //   return this.apiService.delete('/articles/' + slug + '/favorite');
  // }
}