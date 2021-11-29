import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface LoginResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.apiUrl;
  private user!: User;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public login (username: string, password: string) {
    return new Observable((subscriber) => {
      // Converter token de autenticação em base64
      const token = btoa(`${username}:${password}`);

      // Adicionar token ao header
      const headers = new HttpHeaders({
        'Authorization': `Basic ${token}`
      });

      this.http
      .post<LoginResponse>(`${this.url}/login`, null, { headers })
      .subscribe(
        (response: LoginResponse) => {
          
          if (response.token) {
            this.setSession({ token: response.token, expiresIn: '300' });

            let userAdded = this.setUser(response.token);
            if (userAdded) {
              subscriber.next();
              subscriber.complete();
            } else {
              subscriber.error();
              subscriber.complete();
            }
          } else {
            subscriber.error();
            subscriber.complete();
          }
        },
        (error) => {
          console.log('[AuthService] error:', error);

          subscriber.error();
          subscriber.complete();
        }
      );
    });
  }

  public logout() {
    this.http
    .post(`${this.url}/logout`, null)
    .subscribe(
      () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expires_at');
        this.router.navigateByUrl('/login');
      }
    );

  }

  public isLoggedIn(): boolean {
    const isLoggedIn = moment().isBefore(this.getExpiration());

    console.log('[AuthService] usuário está logado -', isLoggedIn);

    return isLoggedIn;
  }

  public setUser(token: string): boolean {
    let userObj = this.decryptToken(token);
    if (userObj) {
      this.user = new User(userObj['username'], userObj['role']);
      return true;
    }
    return false;
  }

  public getLoggedInUser() {
    if (this.isLoggedIn()) {
      return this.user;
    }
    return null;
  }

  private setSession(response: { token: string, expiresIn: string}) {
    const expiresAt = moment().add(response.expiresIn, 'seconds');

    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    console.log('[AuthService] sessão iniciada - token', response.token);
  }

  private getExpiration() {
    const expiration = sessionStorage.getItem('expires_at') as string;
    const expiresAt = JSON.parse(expiration);

    console.log('[AuthService] token expira em', moment(expiresAt));

    return moment(expiresAt);
  }

  private decryptToken(token: string): any | null {
    try {
      const data = token.split('.');
      let response = atob(data[1]);
      return JSON.parse(response);
    } catch (error) {
      return null;
    }
  }
}
