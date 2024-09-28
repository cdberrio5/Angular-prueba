import { NgModule } from '@angular/core'; // Importing NgModule decorator from Angular core
import { CommonModule } from '@angular/common'; // Importing CommonModule for common directives like ngIf and ngFor
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importing modules for template-driven and reactive forms
import { TaskFormComponent } from './task-form/task-form.component'; // Importing the component for creating or editing tasks
import { TaskListComponent } from './task-list/task-list.component'; // Importing the component for listing tasks
import { StoreModule } from '@ngrx/store'; // Importing StoreModule to set up NgRx state management
import { taskReducer } from '../store/tasks/task.reducer'; // Importing the reducer for managing task state
import { RouterModule } from '@angular/router'; // Importing RouterModule for routing capabilities
import { BrowserModule } from '@angular/platform-browser'; // Importing BrowserModule for browser-specific functionalities
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importing animations support
import { MatIconModule } from '@angular/material/icon'; // Importing Material Design icon module
import { MatFormFieldModule } from '@angular/material/form-field'; // Importing Material Design form field module
import { MatInputModule } from '@angular/material/input'; // Importing Material Design input module
import { MatCardModule } from '@angular/material/card'; // Importing Material Design card module
import { MatButtonModule } from '@angular/material/button'; // Importing Material Design button module
import { MatListModule } from '@angular/material/list'; // Importing Material Design list module
import { MatNativeDateModule } from '@angular/material/core'; // Importing Material Design date module
import { MatDatepickerModule } from '@angular/material/datepicker'; // Importing Material Design datepicker module
import { DragDropModule } from '@angular/cdk/drag-drop'; // Importing Drag and Drop module for task management
import { MatAutocompleteModule } from '@angular/material/autocomplete'; // Importing Material Design autocomplete module
import { MatOptionModule } from '@angular/material/core'; // Importing Material Design option module
import { MatSelectModule } from '@angular/material/select'; // Importing Material Design select module
import { TaskDetailComponent } from './task-detail/task-detail.component'; // Importing the component for task details

@NgModule({
  declarations: [
    TaskFormComponent, // Declaring TaskFormComponent
    TaskListComponent, // Declaring TaskListComponent
    TaskDetailComponent // Declaring TaskDetailComponent
  ],
  imports: [
    BrowserModule, // Importing BrowserModule for the application
    DragDropModule, // Importing DragDropModule for drag-and-drop functionality
    RouterModule, // Importing RouterModule for routing
    BrowserAnimationsModule, // Importing BrowserAnimationsModule for animation support
    FormsModule, // Importing FormsModule for template-driven forms
    ReactiveFormsModule, // Importing ReactiveFormsModule for reactive forms
    MatIconModule, // Importing Material icon module
    MatFormFieldModule, // Importing Material form field module
    MatInputModule, // Importing Material input module
    MatCardModule, // Importing Material card module
    MatButtonModule, // Importing Material button module
    MatListModule, // Importing Material list module
    CommonModule, // Importing CommonModule for common directives
    StoreModule.forFeature('tasks', taskReducer), // Setting up NgRx feature store for tasks
    MatNativeDateModule, // Importing Material native date module
    MatDatepickerModule, // Importing Material datepicker module
    MatAutocompleteModule, // Importing Material autocomplete module
    MatOptionModule, // Importing Material option module
    MatSelectModule // Importing Material select module
  ],
  exports: [
    TaskFormComponent, // Exporting TaskFormComponent for use in other modules
    TaskListComponent, // Exporting TaskListComponent for use in other modules
    TaskDetailComponent // Exporting TaskDetailComponent for use in other modules
  ]
})
export class TasksModule { } // Exporting the TasksModule for use in the application
