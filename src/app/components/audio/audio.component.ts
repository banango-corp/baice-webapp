import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.css']
})
export class AudioComponent implements OnInit {
  @Input() audio!: HTMLAudioElement;

  public isPlaying: boolean = false;
  public timeLeft: string = '00:00';

  constructor() { }

  ngOnInit(): void {
    if (this.audio) {
      console.log(this.audio);

      this.audio.addEventListener('ended', () => {
        console.log('audio terminou');
        this.isPlaying = false;
      });

      // Mostra um contador
      this.audio.addEventListener('timeupdate', () => {
        let timeLeft = 0;
        let duration = Math.floor(this.audio.duration);
        let currentTime = Math.floor(this.audio.currentTime);
        let sec, min;

        timeLeft = duration - currentTime;
        sec = timeLeft % 60;
        min = Math.floor(timeLeft / 60) % 60;

        sec = sec < 10 ? "0" + sec : sec;
        min = min < 10 ? "0" + min : min;

        this.timeLeft = min + ":" + sec;
      });
    }
  }

  public play() {
    this.audio.play()
    .then(() => {
      console.log('audio esta tocando');
      this.isPlaying = true;
    })
    .catch((err) => {
      console.log('não foi possível iniciar áudio', err);
    });

  }

  public stop() {
    console.log('audio pausado');
    this.audio.pause();
    this.isPlaying = false;
  }

}
