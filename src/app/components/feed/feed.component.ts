import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { User } from 'src/app/models/user.model';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: User;
  public posts: any;
  public error: boolean = false;
  public loading: boolean = false;

  private postsSubscription!: Subscription;

  constructor(private userService: UserService, private postService: PostService) {
    this.user = this.userService.getUser();
  }

  ngOnInit() {
    this.refresh();
  }

  /**
   * Realiza uma chamada para /feed
   */
  public refresh() {
    this.loading = true;
    this.error = false;

    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    this.postsSubscription = this.postService
    .getPosts()
    .subscribe(
      (response: Post[]) => {
        console.log(response);
        this.posts = response;
        this.loading = false;
      },
      (error) => {
        this.error = true;
        this.loading = false;
      }
    );
  }

}
