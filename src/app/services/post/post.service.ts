import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';


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

    return this.http.post(
      `${this.url}/post`,
      file,
      {
        headers
      }
    );

  }
}
