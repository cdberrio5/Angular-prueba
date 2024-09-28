import { NgModule } from '@angular/core'; // Importing the NgModule decorator
import { BrowserModule } from '@angular/platform-browser'; // Importing BrowserModule for web applications
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importing for animations
import { AppRoutingModule } from './app-routing.module'; // Importing routing module
import { AppComponent } from './app.component'; // Importing the root component
import { SharedModule } from './shared/shared.module'; // Importing shared functionalities
import { TasksModule } from './tasks/tasks.module'; // Importing task management functionalities
import { UsersModule } from './users/users.module'; // Importing user management functionalities
import { StoreModule } from '@ngrx/store'; // Importing NgRx store for state management
import { EffectsModule } from '@ngrx/effects'; // Importing NgRx effects for side effects
import { StoreDevtoolsModule } from '@ngrx/store-devtools'; // Importing tools for debugging NgRx state
import { HttpClientModule } from '@angular/common/http'; // Importing HttpClient for making HTTP requests
import { CommonModule } from '@angular/common'; // Importing CommonModule for common directives
import { UserEffects } from './store/users/user.effects'; // Importing user effects
import { MatDialogModule } from '@angular/material/dialog'; // Importing Angular Material dialog module
import { TaskEffects } from './store/tasks/task.effects'; // Importing task effects

@NgModule({
  declarations: [
    AppComponent, // Declaring the root component
  ],
  imports: [
    BrowserModule, // Importing necessary modules for web applications
    CommonModule, // Importing common Angular directives
    BrowserAnimationsModule, // Enabling animations in the application
    AppRoutingModule, // Importing the routing module for navigation
    SharedModule, // Importing shared functionalities and components
    TasksModule, // Importing task management module
    UsersModule, // Importing user management module
    HttpClientModule, // Enabling HTTP communication
    MatDialogModule, // Enabling dialogs from Angular Material
    StoreModule.forRoot({}), // Setting up the root store
    EffectsModule.forRoot([UserEffects, TaskEffects]), // Registering effects for user and task management
    StoreDevtoolsModule.instrument() // Enabling debugging tools for NgRx
  ],
  providers: [], // Providing services if any
  bootstrap: [AppComponent], // Bootstrapping the application with the root component
})
export class AppModule { } // Exporting the AppModule class
