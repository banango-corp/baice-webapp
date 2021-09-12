import { async, TestBed, waitForAsync } from '@angular/core/testing';
import { Observable, of, throwError } from 'rxjs';
import { PostService } from './post.service';
import { Post } from '../../models/post.model';
import { HttpErrorResponse } from '@angular/common/http';


describe('AudioService', () => {
  let service: PostService;

  let httpClientMock = jasmine.createSpyObj('HttpClient', ['get', 'post', 'delete', 'put']);

  beforeEach(() => {
    service = new PostService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('post', () => {
    it('should not crash', () => {
      let post: Post = {
        id: '123',
        audioURL: 'abc',
        audioDuration: 5,
        username: 'abc',
        likes: [],
        likesCount: 0,
        dislikesCount: 0,
        playsCount: 0,
        createdAt: '123'
      };

      httpClientMock.post.and.returnValue(of(post));

      let file = new Blob();

      expect(service.post(file)).not.toThrow;
    });
  });

  describe('delete', () => {
    it('should not crash', () => {
      httpClientMock.delete.and.returnValue(of());
      expect(service.delete('123')).not.toThrow;
    });
  });

  describe('updateLikeStatus', () => {
    it('should not crash', () => {
      httpClientMock.put.and.returnValue(of());
      expect(service.updateLikeStatus('123')).not.toThrow;
    });
  });

  describe('getPosts', () => {
    it('shoudl not crash', () => {
      let posts: Post[] = [];
      httpClientMock.get.and.returnValue(of(posts));
      expect(service.getPosts()).not.toThrow;
    });

    it('should return posts array when request succeeds', waitForAsync(() => {
      let posts: Post[] = [];
      httpClientMock.get.and.returnValue(of(posts));

      service.getPosts()
      .subscribe(
        (posts) => {
          expect(posts).toBeDefined;
        },
        (error) => fail('Spec should have not fail.')
      );
    }));

    it('should return error when request fails', waitForAsync(() => {
      httpClientMock.post.and.returnValue(throwError('error'));

      service.getPosts().subscribe(
        (sucess) => fail('Spec should have erroed.'),
        (error) => {
          expect(error).toBeDefined();
        }
      );
    }));
  });
});
