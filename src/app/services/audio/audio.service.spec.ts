import { TestBed, waitForAsync } from '@angular/core/testing';

import { AudioService } from './audio.service';

describe('AudioService', () => {
  let service: AudioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AudioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('recorder', () => {
    let promise: Promise<MediaStream>;
    beforeEach(() => {
      const track = {
        stop: () => {}
      };

      let tracks = [track];

      const audioStream = {
        getTracks: () => tracks
      } as MediaStream;

      promise = Promise.resolve(audioStream);
    });

    it('shoudl not crash', () => {
      spyOn(navigator.mediaDevices, 'getUserMedia').and.returnValue(promise);
      expect(service.recorder()).not.toThrow;
    });
  });
});
