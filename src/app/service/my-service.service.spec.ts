import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { MyServiceService } from './my-service.service';

describe('MyServiceService', () => {
  let service: MyServiceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(MyServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct value', () => {
    const result = service.getContent();
    expect(result).toBe('My content');
  });

  it('should get http content', (done) => {
    const mockResponse = { foo: 'bar' };
    service.getHttpContent().subscribe(data => {
      expect(data).toBe(JSON.stringify(mockResponse, null, 2));
      done();
    });
    const req = httpTestingController.expectOne('https://httpbin.org/get');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
    httpTestingController.verify();
  });
});
