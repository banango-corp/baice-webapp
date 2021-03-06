import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  /**
   * Emite um sinal para que o Post seja removido do Feed
   */
  @Output() onDelete = new EventEmitter<string>();

  public audio!: HTMLAudioElement;

  public isDeleting: boolean = false;

  public loggedInUsername!: string;

  constructor(private postService: PostService, private authService: AuthService) {
    let loggedInUser = this.authService.getLoggedInUser();
    if (loggedInUser) {
      this.loggedInUsername = loggedInUser.getUsername();
    }
  }

  ngOnInit(): void {
    if (this.post) {
      this.audio = new Audio(this.post.audioURL);
    }
  }

  public delete() {
    this.isDeleting = true;
    this.postService.delete(this.post.id)
    .subscribe(
      () => {
        console.log('post deletado com sucesso');
        this.onDelete.emit(this.post.id);
      },
      () => {
        //TODO: validação de erro
        console.log('não foi possível deletar o post');
        this.isDeleting = false;
      }
    );
  }

  public updateLikeStatus() {
    this.postService.updateLikeStatus(this.post.id)
    .subscribe(
      (updatedPost) => {
        console.log('post atualizado com sucesso', updatedPost);
        this.post = updatedPost;
      },
      () => {
        // TODO: validação de erro
        console.log('erro ao atualizar post');
      }
    )
  }
}
