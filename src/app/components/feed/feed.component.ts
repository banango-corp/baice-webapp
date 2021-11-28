import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public posts!: any[];
  public error: boolean = false;
  public loading: boolean = false;
  public username!: string;

  private postsSubscription!: Subscription;

  constructor(
    private postService: PostService,
    private userService: UserService,
    private authService: AuthService
  ) {
    if (authService.isLoggedIn()) {
      // this.username = this.userService.user.getUsername();
    }
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

  /**
   * Remove a necessidade de realizar um refresh ao deletar um post,
   * retira o Post com o id em questão do array de Posts.
   */
  public removePostFromFeed(id: string) {
    if (id) {
      let postIndex = this.posts.findIndex((post) => post.id == id);
      if (postIndex > -1) {
        this.posts.splice(postIndex, 1);
      }
    }
  }

  public logout() {
    this.authService.logout();
  }

}
