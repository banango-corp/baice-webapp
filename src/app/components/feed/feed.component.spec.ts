import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, Subscription, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';
import { UserService } from 'src/app/services/user/user.service';

import { FeedComponent } from './feed.component';

describe('FeedComponent', () => {
  let component: FeedComponent;
  let fixture: ComponentFixture<FeedComponent>;

  let userServiceMock = jasmine.createSpyObj('UserService', ['getUser']);
  let postServiceMock = jasmine.createSpyObj('PostService', ['getPosts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        FeedComponent
      ],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: PostService, useValue: postServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not crash if no subscription exists', () => {
      postServiceMock.getPosts.and.returnValue(of([]));
      expect(component.ngOnInit()).not.toThrow;
    });
  });

  describe('refresh', () => {
    it('should not crash if a subscription already exists', () => {
      postServiceMock.getPosts.and.returnValue(of([]));
      component.refresh();
      expect(component.refresh()).not.toThrow;
    });

    it('should indicate an error if request errors out', () => {
      postServiceMock.getPosts.and.returnValue(throwError('erro'));
      component.refresh();
      expect(component.error).toBe(true);
    });
  });

  describe('removePostFromFeed', () => {
    let post;
    let posts;

    beforeEach(() => {
      post = { id: '123'} as Post;
      posts = [post];
      component.posts = posts;
    });

    it('should remove the Post with the given id', () => {
      component.removePostFromFeed('123');
      expect(component.posts.length).toBe(0);
    });

    it('should not crash if no id is given', () => {
      expect(component.removePostFromFeed('')).not.toThrow;
      expect(component.posts.length).toBe(1);
    });

    it('should not remove Post if invalid id is given', () => {
      expect(component.removePostFromFeed('2')).not.toThrow;
      expect(component.posts.length).toBe(1);
    });
  });
});
