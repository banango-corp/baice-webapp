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
  }

  public delete() {
    this.onDelete.emit(this.post.getId());
  }

  public play() {
    this.isPlaying = true; // Quando/como setar em false?
    this.post.getAudio().play();
  }

}
