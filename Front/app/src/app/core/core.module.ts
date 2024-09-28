import { NgModule } from '@angular/core';  // Importing the NgModule decorator, which defines a module
import { CommonModule } from '@angular/common';  // Importing CommonModule for common Angular directives like ngIf, ngFor, etc.
import { UserService } from './services/user.service';  // Importing the UserService which handles user-related HTTP operations
import { TaskService } from './services/task.service';  // Importing the TaskService which handles task-related HTTP operations

/**
 * The CoreModule is responsible for providing services that will be used
 * across the entire application. It typically contains singleton services
 * that should only be instantiated once.
 */
@NgModule({
  // Modules to import for this module's components. In this case, CommonModule is imported
  // to give this module access to common directives such as ngIf, ngFor, etc.
  imports: [
    CommonModule
  ],
  
  /**
   * The providers array is where we declare services that will be globally available
   * in the application. This ensures that only one instance of each service is created.
   * In this case, both UserService and TaskService are provided.
   */
  providers: [
    UserService,  // Declaring UserService as a globally available provider
    TaskService   // Declaring TaskService as a globally available provider
  ]
})
/**
 * CoreModule is used to organize services that are essential to the entire application,
 * ensuring that they are singleton (single instance) and globally accessible.
 */
export class CoreModule { }
