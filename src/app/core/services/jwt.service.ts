import { Injectable } from "@angular/core";

@Injectable()
export class JwtService {
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  saveToken(token: String): void {
    window.localStorage['jwtToken'] = token;
  }

  destroyToken(): void {
    window.localStorage.removeItem('jwtToken');
  }
}