import { ComponentFixture, TestBed } from '@angular/core/testing'; // Importing necessary modules for testing
import { TaskDetailComponent } from './task-detail.component'; // Importing the component to be tested

// Describing the test suite for the TaskDetailComponent
describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent; // Declaring a variable to hold the component instance
  let fixture: ComponentFixture<TaskDetailComponent>; // Declaring a variable to hold the component fixture

  // This function runs before each test in this suite
  beforeEach(() => {
    // Configuring the testing module with the component declaration
    TestBed.configureTestingModule({
      declarations: [TaskDetailComponent] // Declaring the TaskDetailComponent for testing
    });
    
    // Creating the component fixture, which contains the component instance and allows testing its behavior
    fixture = TestBed.createComponent(TaskDetailComponent);
    
    // Getting the component instance from the fixture
    component = fixture.componentInstance;
    
    // Running change detection for the component
    fixture.detectChanges();
  });

  // A test case to check if the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy(); // Expecting the component to be truthy, meaning it has been created successfully
  });
});
