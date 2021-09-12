import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { AudioService } from 'src/app/services/audio/audio.service';
import { PostService } from 'src/app/services/post/post.service';

import { NewPostComponent } from './new-post.component';

describe('NewPostComponent', () => {
  let component: NewPostComponent;
  let fixture: ComponentFixture<NewPostComponent>;

  let audioServiceMock = jasmine.createSpyObj('AudioService', ['recorder']);
  let postServiceMock = jasmine.createSpyObj('PostService', ['post', 'posts']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPostComponent ],
      providers: [
        { provide: AudioService, useValue: audioServiceMock },
        { provide:  PostService, useValue: postServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('record', () => {
    it('should not crash', () => {
      audioServiceMock.recorder.and.returnValue(of());
      expect(() => component.record()).not.toThrowError();
      expect(audioServiceMock.recorder).toHaveBeenCalled();
    });
  });

  it('stop', () => {
    audioServiceMock.recorder.and.returnValue(of({ start: () => {}, stop: () => of({}) }));
    component.record();
    component.stop();

    expect(audioServiceMock.recorder).toHaveBeenCalled();
  });

  it('deleteAudio', () => {
    component.deleteAudio();
    expect(component.newAudio).toBeNull();
    expect(component.error).toBe(false);
  });

  xdescribe('post', () => {
    let post: any;
    beforeEach(() => {
      post = {} as Post;
      postServiceMock.post.and.returnValue(of(post));
      postServiceMock.posts.and.returnValue([post]);
    });

    it('should not crash', () => {
      expect(() => component.post()).not.toThrowError();
    })

    it('should not crash if post is uploading', () => {
      component.uploading = true;
      expect(() => component.post()).not.toThrowError();
    })

    it('should not crash on service error', () => {
      postServiceMock.post.and.returnValue(throwError('error'));
      expect(() => component.post()).not.toThrowError();
    })
  });
});
