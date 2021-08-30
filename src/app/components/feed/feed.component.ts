import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: User;
  public audioUrl: string = '';

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
  }

  public post() {
    this.user.post(this.audioUrl);
    this.audioUrl = '';
  }

}
