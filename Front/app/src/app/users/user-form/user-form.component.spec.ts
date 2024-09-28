import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular core

import { UserFormComponent } from './user-form.component'; // Import the UserFormComponent to be tested

// Describe a test suite for the UserFormComponent
describe('UserFormComponent', () => {
  let component: UserFormComponent; // Declare a variable for the component instance
  let fixture: ComponentFixture<UserFormComponent>; // Declare a variable for the component fixture

  // Setup function that runs before each test
  beforeEach(() => {
    // Configure the testing module with the UserFormComponent
    TestBed.configureTestingModule({
      declarations: [UserFormComponent] // Declare the component to be tested
    });
    fixture = TestBed.createComponent(UserFormComponent); // Create a fixture for the component
    component = fixture.componentInstance; // Get an instance of the component from the fixture
    fixture.detectChanges(); // Trigger initial data binding and lifecycle hooks
  });

  // Define a test case to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Assert that the component instance is truthy (exists)
  });
});
