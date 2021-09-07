import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;
  @Output() onDelete = new EventEmitter<number>();

  public isPlaying: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.post) {
      this.post.getAudio().addEventListener('ended', () => {
        console.log('audio has ended');
        this.isPlaying = false;
      })
    }
  }

  public delete() {
    this.onDelete.emit(this.post.getId());
  }

  public play() {
    this.isPlaying = true;
    this.post.getAudio().play();
  }

}
