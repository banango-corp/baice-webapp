import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { UserService } from 'src/app/services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  public user: User;
  public audioUrl: string = '';
  public audio!: HTMLAudioElement;

  private recorder!: { start(): void; stop(): Observable<HTMLAudioElement>; };


  constructor(private userService: UserService, private audioService: AudioService) {
    this.user = this.userService.getUser();


  }

  ngOnInit(): void {
  }

  public post() {
    this.user.post(this.audioUrl);
    this.audioUrl = '';
  }

  public record() {
    this.audioService
    .recorder()
    .subscribe((observer) => {
      console.log(observer);
      this.recorder = observer;
      observer.start();
    });
  }

  public stop() {
    this.recorder.stop().subscribe((audio) => {
      audio.play();
    });
  }

}
