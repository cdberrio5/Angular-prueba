import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from './services/user.service';
import { TaskService } from './services/task.service'; 

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    UserService,
    TaskService
  ]
})
export class CoreModule { }
