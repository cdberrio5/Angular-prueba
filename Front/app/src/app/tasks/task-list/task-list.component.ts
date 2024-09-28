import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './../../models/task.model';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { TaskState } from './../../store/tasks/task.state';
import { selectNewTasks, selectPendingTasks, selectCompletedTasks, selectDeletedTasks } from './../../store/tasks/task.selector';
import { addTask, loadTasks, updateTask } from './../../store/tasks/task.actions';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  // Observables for different task statuses
  newTasks$: Observable<Task[]> | undefined;
  pendingTasks$: Observable<Task[]> | undefined;
  completedTasks$: Observable<Task[]> | undefined;
  deletedTasks$: Observable<Task[]> | undefined;

  selectedStatus: number = 0; // Variable to hold the currently selected status filter
  allTasks!: Task[];

  constructor(
    private dialog: MatDialog, // Dialog service for opening modals
    private store: Store<TaskState> // NgRx store to manage task state
  ) { }

  ngOnInit(): void {
    this.loadTasks(); // Load tasks when the component initializes
    this.filterTasks(); // Filter tasks based on the selected status
  }

  loadTasks() {
    this.store.dispatch(loadTasks()); // Dispatch action to load tasks from the store
  }

  filterTasks() {
    // Reset tasks based on the selected status
    this.newTasks$ = this.store.select(selectNewTasks);
    this.pendingTasks$ = this.store.select(selectPendingTasks);
    this.completedTasks$ = this.store.select(selectCompletedTasks);
    this.deletedTasks$ = this.store.select(selectDeletedTasks);

    // Apply filter according to the selected status
    switch (this.selectedStatus) {
      case 0:
        break; // Do nothing, as all tasks are already selected
      case 1: // New Tasks
        console.log("Displaying new tasks");
        this.newTasks$ = this.store.select(selectNewTasks);
        this.pendingTasks$ = of([]); // Clear pending tasks
        this.completedTasks$ = of([]); // Clear completed tasks
        this.deletedTasks$ = of([]); // Clear deleted tasks
        break;
      case 2: // Pending Tasks
        this.newTasks$ = of([]); // Clear new tasks
        this.pendingTasks$ = this.store.select(selectPendingTasks);
        this.completedTasks$ = of([]); // Clear completed tasks
        this.deletedTasks$ = of([]); // Clear deleted tasks
        break;
      case 3: // Completed Tasks
        this.newTasks$ = of([]); // Clear new tasks
        this.pendingTasks$ = of([]); // Clear pending tasks
        this.completedTasks$ = this.store.select(selectCompletedTasks);
        this.deletedTasks$ = of([]); // Clear deleted tasks
        break;
      case 4: // Deleted Tasks
        this.newTasks$ = of([]); // Clear new tasks
        this.pendingTasks$ = of([]); // Clear pending tasks
        this.completedTasks$ = of([]); // Clear completed tasks
        this.deletedTasks$ = this.store.select(selectDeletedTasks);
        break;
      default:
        break;
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Move task within the same list
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transfer task between lists
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      // Handle the status change of the moved task
      this.onTaskMoved(event.container.id, task);
    }
  }

  onTaskMoved(newContainer: string, task: Task) {
    let newStatus: number;

    // Determine new status based on the drop container
    switch (newContainer) {
      case 'cdk-drop-list-0': // New Tasks
        newStatus = 1;
        break;
      case 'cdk-drop-list-1': // Pending Tasks
        newStatus = 2;
        break;
      case 'cdk-drop-list-2': // Completed Tasks
        newStatus = 3;
        break;
      case 'cdk-drop-list-3': // Deleted Tasks
        newStatus = 4;
        break;
      default:
        return;
    }

    // Update the task status
    this.updateTaskStatus(task, newStatus);
  }

  updateTaskStatus(task: Task, newStatus: number) {
    // Create a new task object with the updated status
    const updatedTask = { ...task, status: newStatus };

    // Dispatch action to update the task in the store
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  createTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '700px',
    });

    // After the dialog closes, dispatch action to add the new task
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addTask({ task: result }));
        this.loadTasks(); // Reload tasks to reflect the new task
      }
    });
  }

  openTaskDetailModal(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '700px',
      data: { task } // Pass the task data to the modal
    });

    // After the dialog closes, update the task with any changes made in the modal
    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(updateTask({ task: { ...task, ...result } }));
    });
  }
}
