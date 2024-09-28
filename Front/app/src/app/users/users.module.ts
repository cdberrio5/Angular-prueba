import { NgModule } from '@angular/core'; // Import NgModule from Angular core
import { CommonModule } from '@angular/common'; // Import CommonModule for common directives
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule for template-driven forms and ReactiveFormsModule for reactive forms
import { UserListComponent } from './user-list/user-list.component'; // Import UserListComponent
import { UserFormComponent } from './user-form/user-form.component'; // Import UserFormComponent
import { UserDetailComponent } from './user-detail/user-detail.component'; // Import UserDetailComponent
import { StoreModule } from '@ngrx/store'; // Import StoreModule for NgRx state management
import { userReducer } from './../store/users/user.reducer'; // Import user reducer to manage user state
import { BrowserModule } from '@angular/platform-browser'; // Import BrowserModule for running the application in a browser
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule for animations
import { MatIconModule } from '@angular/material/icon'; // Import Angular Material Icon module
import { MatFormFieldModule } from '@angular/material/form-field'; // Import Angular Material Form Field module
import { MatInputModule } from '@angular/material/input'; // Import Angular Material Input module
import { MatCardModule } from '@angular/material/card'; // Import Angular Material Card module
import { MatButtonModule } from '@angular/material/button'; // Import Angular Material Button module
import { MatListModule } from '@angular/material/list'; // Import Angular Material List module

@NgModule({
  declarations: [
    UserListComponent, // Declare UserListComponent
    UserFormComponent, // Declare UserFormComponent
    UserDetailComponent // Declare UserDetailComponent
  ],
  imports: [
    BrowserModule, // Import BrowserModule
    BrowserAnimationsModule, // Import BrowserAnimationsModule for animations
    FormsModule, // Import FormsModule for template-driven forms
    ReactiveFormsModule, // Import ReactiveFormsModule for reactive forms
    MatIconModule, // Import Material Design Icon module
    MatFormFieldModule, // Import Material Design Form Field module
    MatInputModule, // Import Material Design Input module
    MatCardModule, // Import Material Design Card module
    MatButtonModule, // Import Material Design Button module
    MatListModule, // Import Material Design List module
    CommonModule, // Import CommonModule for common directives
    StoreModule.forFeature('users', userReducer), // Set up NgRx Store with a feature for users
  ],
  exports: [
    UserListComponent, // Export UserListComponent
    UserFormComponent, // Export UserFormComponent
    UserDetailComponent // Export UserDetailComponent
  ]
})
export class UsersModule { } // Export the UsersModule
