import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user!: User;

  constructor() {}

  set user(_user: User) {
    this._user = _user;
  }

  get user(): User {
    return this._user;
  }
}
