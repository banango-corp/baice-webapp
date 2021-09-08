import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: User;
  public posts: any;

  constructor(private userService: UserService, private postService: PostService) {
    this.user = this.userService.getUser();
  }

  ngOnInit(): void {
    this.postService
    .getPosts()
    .subscribe((response: Post[]) => {
      console.log(response);
      this.posts = response;
    });
  }

}
