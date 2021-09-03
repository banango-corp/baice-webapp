import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: User;

  constructor(private userService: UserService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {}

}
