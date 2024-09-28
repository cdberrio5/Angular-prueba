import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing modules

import { UserListComponent } from './user-list.component'; // Import the UserListComponent to test

describe('UserListComponent', () => {
  let component: UserListComponent; // Declare the component variable
  let fixture: ComponentFixture<UserListComponent>; // Declare the fixture variable for testing

  // This function runs before each test case
  beforeEach(() => {
    // Configure the testing module for the UserListComponent
    TestBed.configureTestingModule({
      declarations: [UserListComponent] // Declare the component to be tested
    });

    // Create a fixture for the UserListComponent
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance; // Get an instance of the component
    fixture.detectChanges(); // Trigger change detection
  });

  // Test case to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expect the component instance to be truthy (exists)
  });
});
