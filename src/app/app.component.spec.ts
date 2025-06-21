import { MyServiceService } from './service/my-service.service';
import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { Component } from '@angular/core';
import { MyComponentComponent } from './my-component/my-component.component';

@Component({
  selector: 'app-my-component',
  template: '<p>Mock MyComponent works!</p>',
  standalone: true
})
class MockMyComponentComponent {}

describe('AppComponent', () => {
  let myServiceService: jasmine.SpyObj<MyServiceService>;
  beforeEach(async () => {
    const myServiceSpyObject = jasmine.createSpyObj('MyServiceService', ['getContent', 'getHttpContent']);

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).overrideComponent(AppComponent, {
      remove: {
        imports: [MyComponentComponent]
      },
      add: {
        imports: [MockMyComponentComponent]
      }
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'my-angular' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('my-angular');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, my-angular');
  });
});
