import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../core/services/task.service';
import { Task } from '../../models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.pendingTasks = tasks.filter(task => !task.isCompleted);
      this.completedTasks = tasks.filter(task => task.isCompleted);
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      task.isCompleted = event.container.id === 'completedList';
      this.taskService.updateTask(task);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  toggleCompletion(task: Task) {
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task);
  }
}
