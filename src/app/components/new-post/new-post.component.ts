import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { PostService } from 'src/app/services/post/post.service';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public isRecording: boolean = false;
  public newAudio!: HTMLAudioElement;
  public newPost!: Post;
  public timeCount: number = 0;

  private timeLimit: number = 30; // 30s
  private interval: any;
  private audioFile!: Blob;

  // Ponto de entrada para gravar/parar gravação
  private recorder!: {
    start(): void;
    stop(): Observable<{ audio: HTMLAudioElement, file: Blob }>;
  };

  constructor(
    private audioService: AudioService,
    private postService: PostService
  ) { }

  ngOnInit(): void {
  }

  public record() {
    this.audioService
    .recorder()
    .subscribe((observer) => {
      this.isRecording = true;
      this.newAudio = null as any;
      this.startTimeCount();
      this.recorder = observer;
      observer.start();
    });
  }

  public stop() {
    this.recorder.stop().subscribe((response) => {
      this.stopTimeCount();
      this.isRecording = false;
      this.newAudio = response.audio;
      this.audioFile = response.file;
    });
  }

  public deleteAudio() {
    this.newAudio = null as any;
  }

  public post() {
    this.postService
    .post(this.audioFile)
    .subscribe(
      (post: Post) => {
        console.log(post);
        this.postService.posts.unshift(post)
        this.newAudio = null as any;
      },
      (error) => {
        //TODO implementar validação de erro
        console.log(error);
      }
    );
  }

  /**
   * Começa a contagem e incrementa a variável timeCount
   */
  private startTimeCount() {
    this.interval = setInterval(() => {
      this.timeCount++;
      if (this.timeCount === this.timeLimit) {
        this.stop();
      }
    }, 1000);
  }

  /**
   * Para a contagem e reseta a variável timeCount
   */
  private stopTimeCount() {
    console.log('parando a contagem de tempo');
    clearInterval(this.interval);
    this.timeCount = 0;
  }


}
