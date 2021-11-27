import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private user = {
    username: 'admin',
    password: 'admin'
  };

  constructor() { }

  public login (username: string, password: string) {
    return new Observable((subscriber) => {
      if (username === this.user.username && password === this.user.password) {
        //TODO back-end deve retornar um token JWT
        // this.setSession(response);
        subscriber.next();
        subscriber.complete();
      } else {
        subscriber.error();
        subscriber.complete();
      }
    });
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  private setSession(response: { token: string, expiresIn: string}) {
    const expiresAt = moment().add(response.expiresIn, 'seconds');

    localStorage.setItem('token', response.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at') as string;
    const expiresAt = JSON.parse(expiration);

    return moment(expiresAt);
  }
}
