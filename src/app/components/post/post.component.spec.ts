import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post/post.service';

import { PostComponent } from './post.component';

describe('PostComponent', () => {
  let component: PostComponent;
  let fixture: ComponentFixture<PostComponent>;

  let postServiceMock = jasmine.createSpyObj('PostService', ['delete', 'updateLikeStatus']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostComponent ],
      providers: [
        { provide: PostService, useValue: postServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not crash if no Post is defined', () => {
      expect(() => component.ngOnInit()).not.toThrowError();
    });

    it('should not crash if a Post is defined', () => {
      let post = {
        audioURL: ''
      } as Post;
      component.post = post;
      expect(() => component.ngOnInit()).not.toThrowError();
      expect(component.audio).toBeDefined();
    });
  });

  describe('delete', () => {
    beforeEach(() => {
      let post = {
        audioURL: '',
        id: ''
      } as Post;
      component.post = post;
    });

    it('should not crash on success', () => {
      postServiceMock.delete.and.returnValue(of());
      expect(() => component.delete()).not.toThrowError();
    });

    it('should not crash on error', () => {
      postServiceMock.delete.and.returnValue(throwError('error'));
      expect(() => component.delete()).not.toThrowError();
      expect(component.isDeleting).toBe(false);
    });
  });

  describe('updateLikeStatus', () => {
    beforeEach(() => {
      let post = {
        audioURL: '',
        id: '123'
      } as Post;
      component.post = post;
    });

    it('should not crash on success', () => {
      let updatedPost = {
        id: 'abc'
      } as Post;
      postServiceMock.updateLikeStatus.and.returnValue(of(updatedPost));

      expect(() => component.updateLikeStatus()).not.toThrowError();
      expect(component.post.id).toBe('abc');
    });

    it('should not crash on error', () => {
      postServiceMock.updateLikeStatus.and.returnValue(throwError('error'));

      expect(() => component.updateLikeStatus()).not.toThrowError();
      expect(component.post.id).toBe('123');
    });
  });
});
