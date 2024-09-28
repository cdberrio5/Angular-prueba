import { Component, OnInit } from '@angular/core'; // Imports Angular core components and lifecycle interface
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms'; // Imports classes for reactive forms
import { MatDialogRef } from '@angular/material/dialog'; // Imports dialog reference type to close the dialog
import { Task } from './../../models/task.model'; // Imports the Task interface for typing task data
import { Store } from '@ngrx/store'; // Imports Store for managing application state
import { loadUsers } from './../../store/users/user.actions'; // Imports the action to load users from the Store
import { selectAllUsers } from './../../store/users/user.selector'; // Imports selector to get all users
import { User } from 'src/app/models/user.model'; // Imports the User interface for typing user data
import { ToastrService } from 'ngx-toastr'; // Imports ToastrService for notifications

@Component({
  selector: 'app-task-form', // Defines the component selector
  templateUrl: './task-form.component.html', // Defines the component HTML template
  styleUrls: ['./task-form.component.scss'] // Defines the component styles
})
export class TaskFormComponent implements OnInit { // Defines the component class that implements OnInit
  taskForm: FormGroup; // Declares a reactive form for the task
  assignedUsers: FormArray; // Declares an array to manage assigned users
  userSearchControl = new FormControl(); // Form control for user search
  filteredUsers: any[] = []; // Array to store filtered users based on search
  allUsers: User[] = []; // Array to store all available users

  constructor(
    private fb: FormBuilder, // Injects FormBuilder to create reactive forms
    private dialogRef: MatDialogRef<TaskFormComponent>, // Injects dialog reference to close the dialog
    private store: Store, // Injects Store to access application state
    private toastr: ToastrService // Injects ToastrService for notifications
  ) {
    // Initializes the reactive form with fields and validations
    this.taskForm = this.fb.group({
      title: ['', Validators.required], // Title field with required validation
      description: [''], // Description field without validations
      deadline: ['', Validators.required], // Deadline field with required validation
      assignedUsers: this.fb.array([]) // Field for assigned users as an array
    });

    // Assigns the FormArray of assigned users to the variable
    this.assignedUsers = this.taskForm.get('assignedUsers') as FormArray;
  }

  ngOnInit(): void { // Lifecycle method executed when the component initializes
    // Dispatches action to load users from the store
    this.store.dispatch(loadUsers());

    // Selects users from state and assigns to variables
    this.store.select(selectAllUsers).subscribe(users => {
      this.allUsers = users; // Stores all users in allUsers
      this.filteredUsers = users; // Initializes filteredUsers with all users
    });
  }

  // Method to filter users based on search term
  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.allUsers; // If no search term, show all users
      return;
    }
    
    // Filters users based on full name
    this.filteredUsers = this.allUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Method executed when a user is selected
  onUserSelected(user: { id: any; age: number; name: any; skills: any; }): void {
    // Checks if the user is already assigned
    const userAlreadyAssigned = this.assignedUsers.controls.some(control => control.get('id')?.value === user.id);
    
    // Checks if the user can be assigned
    if (!userAlreadyAssigned && user.age >= 18 && user.skills.length > 0) {
      // Creates a new FormGroup for the assigned user
      const userForm = this.fb.group({
        id: [user.id], // Stores the user's ID
        name: [user.name], // Stores the user's name
        age: [user.age], // Stores the user's age
        skills: this.fb.array(user.skills || []) // Stores the user's skills
      });
  
      this.assignedUsers.push(userForm); // Adds the new FormGroup to the FormArray
      this.userSearchControl.setValue(''); // Clears the search field
    } else {
      // Error message if the user cannot be assigned
      let errorMessage = '';
      if (userAlreadyAssigned) {
        errorMessage = 'The user is already assigned.'; // Error for already assigned user
      } else if (user.age < 18) {
        errorMessage = 'The user must be over 18 years old.'; // Error for insufficient age
      } else if (user.skills.length === 0) {
        errorMessage = 'The user must have at least one skill.'; // Error for lack of skills
      }
  
      this.userSearchControl.setValue(''); // Clears the search field
      this.showError(errorMessage); // Displays the error message
    }
  }
  
  // Method to show error messages in the console
  showError(message: string) {
    this.toastr.error(message, 'Oops!'); // Logs the error message to the console
  }

  // Method to remove a user from the FormArray
  removeUser(index: number): void {
    this.assignedUsers.removeAt(index); // Removes the user at the specified index
  }

  // Method executed when submitting the form
  onSubmit(): void {
    if (this.taskForm.valid) { // Checks if the form is valid
      const taskData: Task = {
        ...this.taskForm.value, // Gets the values from the form
        assignedUsers: this.assignedUsers.value // Includes the assigned users
      };
      this.dialogRef.close(taskData); // Closes the dialog and returns the task data
    }
  }

  // Method to cancel and close the dialog without saving
  onCancel(): void {
    this.dialogRef.close(); // Closes the dialog without returning data
  }
}
