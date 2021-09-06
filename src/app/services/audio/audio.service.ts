import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostService } from '../post/post.service';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor(private postService: PostService) { }

  public recorder() {
    return new Observable<{ start(): void, stop(): Observable<HTMLAudioElement> }>((subscriber) => {
      navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream: MediaStream) => {
        // Start recording the audio
        const mediaRecorder = new MediaRecorder(stream);
        let audio: HTMLAudioElement;

        // While recording, store the audio in data chunks
        const audioChunks: Blob[] = [];
        mediaRecorder.addEventListener('dataavailable', (event: BlobEvent) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener('error', () => {
          subscriber.error('Não foi possível gravar o áudio');
          subscriber.complete();
        });

        const start = (): void => {
          console.log('mediaRecorder start');
          mediaRecorder.start();
        }

        const stop = (): Observable<HTMLAudioElement> => {
          return new Observable((subscriber) => {
            // Convert the audio data chunks to a single audio
            mediaRecorder.addEventListener('stop', () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });

              //TODO: APENAS SALVAR NO BANCO DEPOIS QUE O USUÁRIO CONFIRMAR (ELE PODE QUERER CANCELAR)
              this.postService
              .post(audioBlob)
              .subscribe( //TODO: ADICIONAR VALIDAÇÃO DE ERRO
                ((response: any) => {
                  console.log(response);
                  const audioUrl = URL.createObjectURL(audioBlob);
                  audio = new Audio(response['audioURL']);
                  // audio.play();
                  console.log('Audio', audio);
                  subscriber.next(audio);
                  subscriber.complete();
                })
              );


            });
            mediaRecorder.stop();
          });
        }

        subscriber.next({ start, stop });
        subscriber.complete();
      });
    });
  }
}
