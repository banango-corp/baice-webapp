import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  public posts!: Post[];

  private url!: string;

  constructor(private http: HttpClient) {
    this.url = environment.apiUrl;
  }

  public post(file: Blob) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', file.type);
    headers.append('Cache-Control', 'no-cache');
    headers.append('Sec-Fetch-Mode', 'cors');

    return this.http.post<Post>(`${this.url}/post`, file, { headers });
  }

  public delete(id: string) {
    const headers = new HttpHeaders();
    headers.append('Cache-Control', 'no-cache');
    headers.append('Sec-Fetch-Mode', 'cors');

    return this.http.delete(`${this.url}/post/${id}`, { headers });
  }

  public updateLikeStatus(id: string) {
    const headers = new HttpHeaders();
    headers.append('Cache-Control', 'no-cache');
    headers.append('Sec-Fetch-Mode', 'cors');

    return this.http.put<Post>(`${this.url}/post/${id}/like`, {}, { headers });
  }

  public getPosts() {
    const headers = new HttpHeaders();
    headers.append('Cache-Control', 'no-cache');
    headers.append('Sec-Fetch-Mode', 'cors');

    return new Observable<Post[]>((subscriber) => {
      this.http
      .get<Post[]>(`${this.url}/feed`, { headers })
      .subscribe(
        (posts: Post[]) => {
          this.posts = posts;
          subscriber.next(this.posts);
          subscriber.complete();
        },
        (error: HttpErrorResponse) => {
          subscriber.error(error);
          subscriber.complete();
        }
      );
    });
  }
}
