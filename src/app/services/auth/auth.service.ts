import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private admin = {
    username: 'admin',
    password: 'admin'
  };

  constructor(private userService: UserService, private router: Router) { }

  public login (username: string, password: string) {
    return new Observable((subscriber) => {
      //TODO validação será feita pelo back-end
      if (username === this.admin.username && password === this.admin.password) {
        this.setSession({ token: 'teste', expiresIn: '300' });

        const user = new User(username);
        this.userService.user = user;

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

    this.router.navigateByUrl('/login');
  }

  public isLoggedIn() {
    const isLoggedIn = moment().isBefore(this.getExpiration());

    console.log('[AuthService] usuário está logado -', isLoggedIn);

    return isLoggedIn;
  }

  private setSession(response: { token: string, expiresIn: string}) {
    const expiresAt = moment().add(response.expiresIn, 'seconds');

    localStorage.setItem('token', response.token);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));

    console.log('[AuthService] sessão iniciada - token', response.token, 'duração -', response.expiresIn);
  }

  private getExpiration() {
    const expiration = localStorage.getItem('expires_at') as string;
    const expiresAt = JSON.parse(expiration);

    console.log('[AuthService] expira em -', moment(expiresAt));

    return moment(expiresAt);
  }
}
