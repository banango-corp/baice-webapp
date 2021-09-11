import { TestBed } from '@angular/core/testing';
import { PostService } from './post.service';


describe('AudioService', () => {
  let service: PostService;

  let httpClientMock = jasmine.createSpyObj('HttpClient', ['get', 'post']);

  beforeEach(() => {
    service = new PostService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
