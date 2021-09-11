import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
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

    postServiceMock.getPosts.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
