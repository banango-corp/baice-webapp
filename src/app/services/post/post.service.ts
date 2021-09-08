import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Post } from 'src/app/models/post.model';


@Injectable({
  providedIn: 'root'
})
export class PostService {
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

  public getPosts() {
    const headers = new HttpHeaders();
    headers.append('Cache-Control', 'no-cache');
    headers.append('Sec-Fetch-Mode', 'cors');

    return this.http.get<Post[]>(`${this.url}/feed`, { headers });
  }
}
