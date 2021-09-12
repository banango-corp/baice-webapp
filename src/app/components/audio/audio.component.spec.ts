import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioComponent } from './audio.component';

describe('AudioComponent', () => {
  let component: AudioComponent;
  let fixture: ComponentFixture<AudioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should not crash if audio is valid', () => {
      component.audio = new Audio();
      expect(component.ngOnInit()).not.toThrow;
    });

    it('should not crash if no audio is present', () => {
      expect(component.ngOnInit()).not.toThrow;
    });
  });

  describe('play', () => {
    it('should indicate the audio is playing on success', () => {
      let promise = Promise.resolve();
      component.audio = new Audio();
      spyOn(component.audio, 'play').and.returnValue(promise);
      expect(component.play()).not.toThrow;
    });

    it('should indicate the audio is not playing on error', () => {
      let promise = Promise.reject();
      component.audio = new Audio();
      spyOn(component.audio, 'play').and.returnValue(promise);
      expect(component.play()).not.toThrow;
    });
  });

  describe('stop', () => {
    it('should indicate the audio stopped', () => {
      component.audio = new Audio();
      component.stop();
      expect(component.isPlaying).toBe(false);
    })
  });


});
