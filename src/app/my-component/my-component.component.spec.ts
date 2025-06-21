import { OtherService } from './../service/other.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyComponentComponent } from './my-component.component';
import { MyServiceService } from '../service/my-service.service';
import { SomeUtil } from '../shared/some-util';
import { of } from 'rxjs';

describe('MyComponentComponent', () => {
  let component: MyComponentComponent;
  let fixture: ComponentFixture<MyComponentComponent>;
  let myService: jasmine.SpyObj<MyServiceService>;
  let otherService: OtherService

  beforeEach(async () => {
    const myServiceSpyObject = jasmine.createSpyObj('MyServiceService', ['getContent', 'getHttpContent']);
    // mock do getContent definido aqui antes de instanciar o componente, pois é usado no ngOnInit
    myServiceSpyObject.getContent.and.returnValue('mocked content');

    await TestBed.configureTestingModule({
      imports: [MyComponentComponent],
      providers: [
        // { provide: MyServiceService, useValue: { getContent: () => 'My content' } }
        { provide: MyServiceService, useValue: myServiceSpyObject },
        { provide: OtherService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyComponentComponent);
    component = fixture.componentInstance;
    myService = TestBed.inject(MyServiceService) as jasmine.SpyObj<MyServiceService>;
    otherService = TestBed.inject(OtherService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get content from MyService', () => {
    const mockedContent = 'mocked content';
    myService.getContent.and.returnValue(mockedContent);

    expect(component.content).toEqual(mockedContent);
    expect(myService.getContent.calls.count()).toBeGreaterThan(0)
  });

  it('should get static content from SomeUtil', () => {
    spyOn(SomeUtil, 'getContent').and.returnValue('static test content');
    expect(component.getStaticContent()).toBe('static test content');
  });

  it('should get content from OtherService', () => {
    const otherServiceContent = 'other test service content';
    spyOn(otherService, 'getContent').and.returnValue(otherServiceContent);
    expect(component.getOtherServiceContent()).toBe(otherServiceContent);
  });

  it('should get content from MyService changing _content', () => {
    const mockedContent = 'mocked content';
    (component as any)._content = mockedContent;
    expect(component.content).toEqual(mockedContent);
  });

  // Teste do método getHttpContent
  it('should get content from MyService via HTTP', (done) => {
    const httpResponse = 'HTTP response content';
    myService.getHttpContent.and.returnValue(of(httpResponse));

    component.getHttpContent();

    expect(myService.getHttpContent).toHaveBeenCalled();
    expect((component as any)._content).toBe(httpResponse);
    done();
  });
});
