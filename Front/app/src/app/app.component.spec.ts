import { TestBed } from '@angular/core/testing'; // Importing TestBed for configuring testing module
import { AppComponent } from './app.component'; // Importing the AppComponent to be tested

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [AppComponent] // Declaring the AppComponent in the testing module
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent); // Creating an instance of the AppComponent
    const app = fixture.componentInstance; // Getting the component instance
    expect(app).toBeTruthy(); // Checking if the component instance was created successfully
  });

  it(`should have as title 'nombre-del-proyecto'`, () => {
    const fixture = TestBed.createComponent(AppComponent); // Creating another instance of the AppComponent
    const app = fixture.componentInstance; // Getting the component instance
    expect(app.title).toEqual('nombre-del-proyecto'); // Asserting that the title property is correctly initialized
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent); // Creating an instance of the AppComponent
    fixture.detectChanges(); // Triggering change detection to update the component's template
    const compiled = fixture.nativeElement as HTMLElement; // Accessing the native DOM element
    expect(compiled.querySelector('.content span')?.textContent).toContain('nombre-del-proyecto app is running!'); // Checking if the rendered content includes the title
  });
});
