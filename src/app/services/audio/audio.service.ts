import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AudioService {

  constructor() { }

  public recorder() {
    return new Observable<{ start(): void, stop(): Observable<{ audio: HTMLAudioElement, file: Blob}> }>((subscriber) => {
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

        const stop = (): Observable<{ audio: HTMLAudioElement, file: Blob}> => {
          return new Observable((subscriber) => {
            // Convert the audio data chunks to a single audio
            mediaRecorder.addEventListener('stop', () => {
              const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
              const audioUrl = URL.createObjectURL(audioBlob);
              audio = new Audio(audioUrl);

              // Enviando o áudio e o Blob para posterior salvamento no DB
              subscriber.next({ audio, file: audioBlob });
              subscriber.complete();
            });

            // Parar o microfone e a gravação
            stream.getTracks().forEach(track => track.stop());
            mediaRecorder.stop();
          });
        }

        subscriber.next({ start, stop });
        subscriber.complete();
      });
    });
  }
}
