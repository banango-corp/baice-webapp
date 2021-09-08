import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  @Input() audio!: HTMLAudioElement;

  public isPlaying: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if (this.audio) {
      this.audio.addEventListener('ended', () => {
        console.log('audio terminou');
        this.isPlaying = false;
      });
    }
  }

  public play() {
    console.log('audio esta tocando');
    this.audio.play();
    this.isPlaying = true;
  }

  public stop() {
    console.log('audio pausado');
    this.audio.pause();
    this.isPlaying = false;
  }

}
