import { ComponentFixture, TestBed } from '@angular/core/testing';
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
});
