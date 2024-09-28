import { Component, Inject, OnInit } from '@angular/core'; // Importing necessary Angular core components and interfaces
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; // Importing Material Dialog for data and reference
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; // Importing Angular forms utilities
import { Store, select } from '@ngrx/store'; // Importing NgRx Store and select for state management
import { Observable } from 'rxjs'; // Importing Observable for reactive programming
import { tap } from 'rxjs/operators'; // Importing RxJS operators for managing observables
import { User } from './../../models/user.model'; // Importing User model
import { Task } from './../../models/task.model'; // Importing Task model
import { selectAllUsers } from './../../store/users/user.selector'; // Selector to get all users from the store
import { loadUsers } from './../../store/users/user.actions'; // Action to load users into the store
import { ToastrService } from 'ngx-toastr'; // Importing ToastrService for notifications

@Component({
  selector: 'app-task-detail', // Defining the selector for this component
  templateUrl: './task-detail.component.html', // Template URL for the component
  styleUrls: ['./task-detail.component.scss'] // Style URL for the component
})
export class TaskDetailComponent implements OnInit {
  taskForm: FormGroup; // Form group to manage task details
  filteredUsers: User[] = []; // Array to hold filtered users for autocomplete
  userSearchControl = this.fb.control(''); // Form control for user search input
  allUsers$: Observable<User[]>; // Observable for all users
  assignedUsers!: FormArray; // FormArray to hold assigned users

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task }, // Injecting dialog data for the task
    private dialogRef: MatDialogRef<TaskDetailComponent>, // Reference to the dialog for closing
    private fb: FormBuilder, // Injecting FormBuilder for form creation
    private store: Store, // Injecting Store for state management
    private toastr: ToastrService // Injecting ToastrService for notifications
  ) {
    // Initializing the form with task data and validators
    this.taskForm = this.fb.group({
      title: [{ value: this.data.task.title, disabled: true }, Validators.required], // Title field
      description: [{ value: this.data.task.description, disabled: true }], // Description field
      deadline: [{ value: this.convertToDateString(this.data.task.deadline), disabled: true }, Validators.required], // Deadline field
      assignedUsers: this.fb.array([]) // Initialize an empty FormArray for assigned users
    });

    this.assignedUsers = this.taskForm.get('assignedUsers') as FormArray; // Casting assignedUsers to FormArray

    // Getting the observable of users from the store
    this.allUsers$ = this.store.pipe(select(selectAllUsers)); // Selecting all users from the store
  }

  ngOnInit(): void {
    // Dispatching an action to load users if they are not already loaded
    this.store.dispatch(loadUsers());

    // Subscribing to all users and assigning them to filteredUsers
    this.allUsers$.pipe(
      tap(users => {
        this.filteredUsers = users; // Assigning all users to filteredUsers initially
      })
    ).subscribe();

    this.loadAssignedUsers(); // Loading assigned users into the form
  }

  // Helper function to convert Date to a string in YYYY-MM-DD format
  convertToDateString(dateString: Date): string {
    const date = new Date(dateString); // Creating a new date object
    const year = date.getFullYear(); // Getting the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Getting the month (0-indexed)
    const day = String(date.getDate()).padStart(2, '0'); // Getting the day

    return `${year}-${month}-${day}`; // Returning formatted date string
  }

  // Function to load assigned users into the form array
  loadAssignedUsers() {
    if (this.assignedUsers) {
      this.assignedUsers.clear(); // Clearing existing assigned users
      this.data.task.assignedUsers.forEach(user => {
        // Pushing each user to the FormArray
        this.assignedUsers.push(this.fb.group({
          id: [user.id], // User ID
          name: [user.fullName], // User full name
          age: [user.age], // User age
          skills: [user.skills] // User skills
        }));
      });
    }
  }

  // Function to remove a user from the assigned users list
  removeUser(index: number) {
    this.assignedUsers.removeAt(index); // Removing user at the specified index
  }

  // Function to add an assigned user to the form array
  addAssignedUser(user: User) {
    this.assignedUsers.push(this.fb.group({
      id: [user.id], // User ID
      name: [user.fullName], // User full name
      age: [user.age], // User age
      skills: [user.skills] // User skills
    }));
  }

  // Function to handle form submission
  onSubmit(): void {
    if (this.taskForm.valid) { // Checking if the form is valid
      const taskData: Task = {
        ...this.data.task, // Spread existing task data
        assignedUsers: this.assignedUsers.value // Get assigned users' values
      };
      this.dialogRef.close(taskData); // Closing the dialog with the task data
    }
  }

  // Function to handle cancel action
  onCancel() {
    this.dialogRef.close(); // Closing the dialog without returning any data
  }

  // Function to filter users based on the search term
  filterUsers(searchTerm: string | null) {
    if (!searchTerm) {
      this.allUsers$.subscribe(users => this.filteredUsers = users); // Show all users if no search term
      return;
    }

    // Filtering users based on the search term
    this.filteredUsers = this.filteredUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) // Checking for a match in full names
    );
  }

  // Function to handle user selection from the autocomplete
  onUserSelected(user: { id: any; age: number; name: any; skills: any; }): void {
    const userAlreadyAssigned = this.assignedUsers.controls.some(control => control.get('id')?.value === user.id); // Checking if user is already assigned
    
    if (!userAlreadyAssigned && user.age >= 18 && user.skills.length > 0) {
      // If user is not assigned, is 18+, and has skills, add them to the assigned users
      const userForm = this.fb.group({
        id: [user.id], // User ID
        name: [user.name], // User name
        age: [user.age], // User age
        skills: this.fb.array(user.skills || []) // User skills
      });
  
      this.assignedUsers.push(userForm); // Adding the user form to the assigned users
      this.userSearchControl.setValue(''); // Clear the search input
    } else {
      // If user cannot be assigned, show the appropriate error message
      let errorMessage = '';
      if (userAlreadyAssigned) {
        errorMessage = 'El usuario ya está asignado.'; // User already assigned error
      } else if (user.age < 18) {
        errorMessage = 'El usuario debe ser mayor de 18 años.'; // Age error
      } else if (user.skills.length === 0) {
        errorMessage = 'El usuario debe tener al menos una habilidad.'; // Skills error
      }
  
      this.userSearchControl.setValue(''); // Clear the search input
      this.showError(errorMessage); // Display the error message
    }
  }

  // Function to show error messages in the console
  showError(message: string) {
    this.toastr.error(message, 'Oops!'); // Logging error message to the console
  }
}
