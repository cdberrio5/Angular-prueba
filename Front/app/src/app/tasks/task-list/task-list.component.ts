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
  newTasks$: Observable<Task[]> | undefined;
  pendingTasks$: Observable<Task[]> | undefined;
  completedTasks$: Observable<Task[]> | undefined;
  deletedTasks$: Observable<Task[]> | undefined;
  selectedStatus: number = 0;
  allTasks!: Task[];

  constructor(
    private dialog: MatDialog,
    private store: Store<TaskState>
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    this.filterTasks();
  }

  loadTasks() {
    this.store.dispatch(loadTasks());
  }

  filterTasks() {
    // Reiniciar tareas
    this.newTasks$ = this.store.select(selectNewTasks);
    this.pendingTasks$ = this.store.select(selectPendingTasks);
    this.completedTasks$ = this.store.select(selectCompletedTasks);
    this.deletedTasks$ = this.store.select(selectDeletedTasks);

    // Aplicar filtro según el estado seleccionado
    switch (this.selectedStatus) {
      case 0:
        break; // No hacemos nada porque ya tenemos todas las tareas
      case 1: // Tareas Nuevas
        console.log("muestra algo{")
        this.newTasks$ = this.store.select(selectNewTasks);
        this.pendingTasks$ = of([]); // Vaciar tareas pendientes
        this.completedTasks$ = of([]); // Vaciar tareas completadas
        this.deletedTasks$ = of([]); // Vaciar tareas completadas
        break;
      case 2: // Tareas Pendientes
        this.newTasks$ = of([]); // Vaciar tareas nuevas
        this.pendingTasks$ = this.store.select(selectPendingTasks);
        this.completedTasks$ = of([]); // Vaciar tareas completadas
        this.deletedTasks$ = of([]); // Vaciar tareas completadas
        break;
      case 3: // Tareas Completadas
        this.newTasks$ = of([]); // Vaciar tareas nuevas
        this.pendingTasks$ = of([]); // Vaciar tareas pendientes
        this.completedTasks$ = this.store.select(selectCompletedTasks);
        this.deletedTasks$ = of([]); // Vaciar tareas completadas
        break;
      case 4: // Tareas Completadas
        this.newTasks$ = of([]); // Vaciar tareas nuevas
        this.pendingTasks$ = of([]); // Vaciar tareas pendientes
        this.completedTasks$ = of([]);
        this.deletedTasks$ = this.store.select(selectDeletedTasks);
        break;
      default:
        break;
    }
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      // Mover tarea dentro de la misma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Transferir tarea entre listas
      const task = event.previousContainer.data[event.previousIndex];
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.onTaskMoved(event.container.id, task);
    }
  }


  onTaskMoved(newContainer: string, task: Task) {
    let newStatus: number;

    switch (newContainer) {
      case 'cdk-drop-list-0': // Nuevas Tareas
        newStatus = 1;
        break;
      case 'cdk-drop-list-1': // Tareas Pendientes
        newStatus = 2;
        break;
      case 'cdk-drop-list-2': // Tareas Completadas
        newStatus = 3;
        break;
      case 'cdk-drop-list-3': // Tareas Eliminadas
        newStatus = 4;
        break;
      default:
        return;
    }

    // Actualiza el estado de la tarea
    this.updateTaskStatus(task, newStatus);
  }

  updateTaskStatus(task: Task, newStatus: number) {
    // Crea un nuevo objeto de tarea con el estado actualizado
    const updatedTask = { ...task, status: newStatus };

    // Despacha la acción para actualizar la tarea en el store
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  createTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(addTask({ task: result }));
        this.loadTasks();
      }
    });
  }

  openTaskDetailModal(task: Task) {
    const dialogRef = this.dialog.open(TaskDetailComponent, {
      width: '700px',
      data: { task } // Pasar el ID de la tarea al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      this.store.dispatch(updateTask({ task: { ...task, ...result } }));
    });
  }
}
