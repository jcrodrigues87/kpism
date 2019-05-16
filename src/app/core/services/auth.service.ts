import { Injectable } from "@angular/core";

import { Observable, BehaviorSubject, ReplaySubject } from "rxjs";
import { map, distinctUntilChanged } from 'rxjs/operators';

import { AuthUser, User, Department } from '../models';
import { ApiService } from "./api.service";
import { JwtService } from "./jwt.service";

@Injectable()
export class AuthUserService {
  private currentAuthUserSubject = new BehaviorSubject<AuthUser>({} as AuthUser);
  public currentAuthUser = this.currentAuthUserSubject.asObservable().pipe(
    distinctUntilChanged()
  );


  private navItensSubject = new BehaviorSubject<Object>({});
  public navItens = this.navItensSubject.asObservable().pipe(
    distinctUntilChanged()
  );


  private isAuthenticatedSubject = new ReplaySubject<boolean>(1);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private jwtService: JwtService
  ) {}

  setAuth(user: AuthUser) {
    this.setNavItens(user);
    // Stores the user token
    this.jwtService.saveToken(user.token);
    // Set current Authuser data into observable
    this.currentAuthUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);
  }

  setNavItens(user: AuthUser) {
    if (user.role === 'admin')
      this.navItensSubject.next([
        {
          name: 'Dashboard',
          icon: 'icon-speedometer',
          url: '/dashboard'
        },
        {
          title: true,
          name: 'Cadastros'
        },
        {
          name: 'Usuarios',
          url: '/admin/users',
          icon: 'icon-puzzle'
        },
        {
          name: 'Departamentos',
          url: '/admin/departments',
          icon: 'icon-puzzle'
        },
        {
          name: 'Períodos',
          url: '/admin/periods',
          icon: 'icon-puzzle'
        },
        {
          name: 'Indicadores',
          url: '/supervisor/indicators',
          icon: 'icon-puzzle'
        }]);
      else if (user.role === 'supervisor') {
        this.navItensSubject.next([
          {
            name: 'Dashboard',
            icon: 'icon-speedometer',
            url: '/dashboard'
          },
          {
            title: true,
            name: 'Cadastro'
          },
          {
            name: 'Indicadores',
            url: '/supervisor/indicators',
            icon: 'icon-puzzle'
          }]);
      } else {
        this.navItensSubject.next([
          {
            name: 'Dashboard',
            icon: 'icon-speedometer',
            url: '/dashboard'
          }]);
      }
  }

  attemptAuth(credentials): Observable<AuthUser> {
    return this.apiService.post('/auth/login', { user: credentials }).pipe(
       map(data => {
         this.setAuth(data.user);
         return data;
       })
    );
  }

  getCurrentAuthUser(): AuthUser {
    return this.currentAuthUserSubject.value;
  }

  getCurrentUserProfile(): User {
    let toReturn: User = new User();

    toReturn.id = this.getCurrentAuthUser().id;
    toReturn.name = this.getCurrentAuthUser().name;
    toReturn.department = { name: this.getCurrentAuthUser().department } as Department;

    return toReturn;
  }

  getNavItems(): any {
    return this.navItensSubject.value;
  }

  populate(): void {
    if (this.jwtService.getToken()) {
      this.apiService.get('/auth')
        .subscribe(
          data => this.setAuth(data.user), 
          err => this.purgeAuth()
        );
    } else {
        this.purgeAuth();
    }
  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentAuthUserSubject.next({} as AuthUser);
    this.isAuthenticatedSubject.next(false);
  }
}