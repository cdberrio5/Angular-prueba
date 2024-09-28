import { NgModule } from '@angular/core'; // Import NgModule from Angular core
import { RouterModule, Routes } from '@angular/router'; // Import RouterModule and Routes for routing
import { TaskListComponent } from './tasks/task-list/task-list.component'; // Import TaskListComponent
import { UserListComponent } from './users/user-list/user-list.component'; // Import UserListComponent

const routes: Routes = [
  { path: '', redirectTo: '/tasks', pathMatch: 'full' }, // Redirect empty path to '/tasks'
  { path: 'tasks', component: TaskListComponent }, // Route for displaying the task list
  { path: 'users', component: UserListComponent }, // Route for displaying the user list
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Import RouterModule with defined routes
  exports: [RouterModule] // Export RouterModule for use in other modules
})
export class AppRoutingModule { } // Export the AppRoutingModule
