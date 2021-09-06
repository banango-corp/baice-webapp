import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AudioService } from 'src/app/services/audio/audio.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  //TODO: ADICIONAR LIMITE DE TEMPO PARA GRAVAÇÃO
  public isRecording: boolean = false;
  private recorder!: { start(): void; stop(): Observable<HTMLAudioElement>; };

  constructor(private audioService: AudioService, private userService: UserService) { }

  ngOnInit(): void {
  }

  public record() {
    this.audioService
    .recorder()
    .subscribe((observer) => {
      this.isRecording = true;
      console.log(observer);
      this.recorder = observer;
      observer.start();
    });
  }

  public stop() {
    this.recorder.stop().subscribe((audio) => {
      this.userService.post(audio.src);
      this.isRecording = false;
      // audio.play();
    });
  }

}
