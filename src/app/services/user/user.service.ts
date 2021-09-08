import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedUser!: User;
  constructor() {
    this.loggedUser = new User('babieste');
  }

  public getUser(): User {
    return this.loggedUser;
  }
}
