import { Injectable } from '@angular/core';
import { Post } from 'src/app/models/post.model';
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

  public post(url: string) {
    this.loggedUser.posts.push(new Post(url));
  }

}
