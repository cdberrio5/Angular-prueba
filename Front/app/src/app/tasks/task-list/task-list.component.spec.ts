import { ComponentFixture, TestBed } from '@angular/core/testing'; // Import necessary testing utilities from Angular testing library
import { TaskListComponent } from './task-list.component'; // Import the component to be tested

describe('TaskListComponent', () => {
  let component: TaskListComponent; // Declare a variable to hold the component instance
  let fixture: ComponentFixture<TaskListComponent>; // Declare a variable for the component's fixture

  beforeEach(() => {
    // Set up the testing module for TaskListComponent
    TestBed.configureTestingModule({
      declarations: [TaskListComponent] // Declare the TaskListComponent for testing
    });
    fixture = TestBed.createComponent(TaskListComponent); // Create a fixture for the component
    component = fixture.componentInstance; // Get the instance of the component from the fixture
    fixture.detectChanges(); // Trigger initial data binding and lifecycle hooks
  });

  it('should create', () => {
    // Test to check if the component is created successfully
    expect(component).toBeTruthy(); // Expect the component instance to be truthy (not null or undefined)
  });
});
