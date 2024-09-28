import { Component, OnInit } from '@angular/core'; // Import necessary Angular core components
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms'; // Import form-related classes
import { Store } from '@ngrx/store'; // Import the Store for state management
import { User } from './../../models/user.model'; // Import the User model
import { loadUsers, addUser } from './../../store/users/user.actions'; // Import user actions
import { Observable } from 'rxjs'; // Import Observable for handling async data
import { selectAllUsers } from './../../store/users/user.selector'; // Import selector to get all users
import { map } from 'rxjs/operators'; // Import map operator for RxJS
import { MatDialog } from '@angular/material/dialog'; // Import Material Dialog for modal management
import { UserFormComponent } from './../user-form/user-form.component'; // Import User Form component
import { UserDetailComponent } from './../user-detail/user-detail.component'; // Import User Detail component

@Component({
  selector: 'app-user-list', // Define the component selector
  templateUrl: './user-list.component.html', // Specify the template URL
  styleUrls: ['./user-list.component.scss'] // Specify the stylesheet URL
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> | undefined; // Observable to hold user data
  userForm: FormGroup; // Form group for user details
  searchQuery: string = ''; // Variable to hold the search query
  filteredUserList$: Observable<User[]> | undefined; // Observable for filtered user list

  constructor(private fb: FormBuilder, private store: Store<{ users: User[] }>, public dialog: MatDialog) {
    // Initialize the form group with validation
    this.userForm = this.fb.group({
      fullName: ['', Validators.required], // Full name field with required validation
      age: ['', [Validators.required, Validators.min(1)]], // Age field with required and minimum validation
      skills: this.fb.array([], Validators.required) // Skills array field with required validation
    });
  }

  ngOnInit(): void {
    this.loadUsers(); // Load users on component initialization
    this.users$ = this.store.select(selectAllUsers); // Select all users from the store

    this.filteredUserList$ = this.users$; // Initialize filtered user list
  }

  private loadUsers() {
    this.store.dispatch(loadUsers()); // Dispatch action to load users
  }

  // Getter for skills FormArray
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray; // Return skills as FormArray
  }

  // Method to add a new user
  addUser() {
    if (this.userForm.valid) { // Check if the form is valid
      const newUser: User = {
        id: null, // Let the API assign the ID
        fullName: this.userForm.value.fullName, // Get full name from the form
        age: this.userForm.value.age, // Get age from the form
        skills: this.userForm.value.skills // Get skills from the form
      };

      this.store.dispatch(addUser({ user: newUser })); // Dispatch action to add user
      this.userForm.reset(); // Reset the form after adding
    }
  }

  // Method to populate the form for editing a user
  editUser(user: User) {
    this.userForm.patchValue(user); // Patch the user data to the form
  }

  // Method to filter users based on the search query
  filterUsers(): void {
    if (this.users$) { // Check if users$ is defined
      this.filteredUserList$ = this.users$.pipe(
        map(users => // Map through users
          users.filter(user => // Filter users based on search query
            user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) || // Check if full name includes the search query
            user.age.toString().includes(this.searchQuery) // Check if age includes the search query
          )
        )
      );
    }
  }

  // Method to trigger user search
  searchUsers(): void {
    this.filterUsers(); // Implement additional search logic if necessary
  }

  // Method to open the user creation form in a dialog
  openUserForm(): void {
    const dialogRef = this.dialog.open(UserFormComponent, { // Open the UserFormComponent dialog
      width: '700px', // Set dialog width
    });
  }

  // Method to open the user detail view in a dialog
  openUserDetail(user: User) {
    const dialogRef = this.dialog.open(UserDetailComponent, { // Open the UserDetailComponent dialog
      width: '700px', // Set dialog width
      data: user // Pass user data to the dialog
    });
  }
}
