import { ComponentFixture, TestBed } from '@angular/core/testing'; // Imports necessary utilities for testing Angular components

import { TaskFormComponent } from './task-form.component'; // Imports the component to be tested

describe('TaskFormComponent', () => { // Defines a test suite for the TaskForm component
  let component: TaskFormComponent; // Declares a variable for the component to be tested
  let fixture: ComponentFixture<TaskFormComponent>; // Declares a variable for the fixture providing access to the component and its test environment

  beforeEach(() => { // This block runs before each test
    TestBed.configureTestingModule({ // Configures a testing module for the component
      declarations: [TaskFormComponent] // Declares the component being tested
    });
    fixture = TestBed.createComponent(TaskFormComponent); // Creates an instance of the component and its test environment
    component = fixture.componentInstance; // Assigns the component instance to the 'component' variable
    fixture.detectChanges(); // Detects changes in the component to initialize it properly
  });

  it('should create', () => { // Defines an individual test
    expect(component).toBeTruthy(); // Asserts that the component has been created successfully
  });
});
