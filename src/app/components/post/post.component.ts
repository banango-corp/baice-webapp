import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';


@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  public audio!: HTMLAudioElement;

  public isPlaying: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.post) {
      this.audio = new Audio(this.post.audioURL);
      this.audio.addEventListener('ended', () => {
        this.isPlaying = false;
      })
    }
  }

  public play() {
    this.isPlaying = true;
    this.audio.play();
  }

}
