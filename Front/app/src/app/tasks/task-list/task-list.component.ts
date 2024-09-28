import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task } from './../../models/task.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskState } from './../../store/tasks/task.state';
import { selectNewTasks, selectPendingTasks, selectCompletedTasks } from './../../store/tasks/task.selector';
import { addTask, loadTasks, updateTask } from './../../store/tasks/task.actions';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  newTasks$: Observable<Task[]> | undefined;
  pendingTasks$!: Observable<Task[]> | undefined;
  completedTasks$!: Observable<Task[]> | undefined;

  constructor(
    private dialog: MatDialog,
    private store: Store<TaskState>
  ) { }

  ngOnInit(): void {
    // Cargar tareas al inicializar el componente
    this.store.dispatch(loadTasks());

    // Conectar observables con selectores del Store
    this.newTasks$ = this.store.select(selectNewTasks);
    this.pendingTasks$ = this.store.select(selectPendingTasks);
    this.completedTasks$ = this.store.select(selectCompletedTasks);
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

      // Actualizar el estado de la tarea después de moverla
      this.onTaskMoved(event.container.id, task);
    }
  }

  onTaskMoved(newContainer: string, task: Task) {
    let newStatus: number;

    // Determinar el nuevo estado de la tarea según la columna
    switch (newContainer) {
      case 'cdk-drop-list-0': // Nuevas Tareas
        newStatus = 1; // Estado para nuevas tareas
        break;
      case 'cdk-drop-list-1': // Tareas Pendientes
        newStatus = 2; // Estado para tareas pendientes
        break;
      case 'cdk-drop-list-2': // Tareas Completadas
        newStatus = 3; // Estado para tareas completadas
        break;
      default:
        return;
    }

    // Actualizar el estado de la tarea
    this.updateTaskStatus(task, newStatus);
  }

  updateTaskStatus(task: Task, newStatus: number) {
    const updatedTask: Task = {
      ...task,
      status: newStatus
    };

    // Despachar la acción para actualizar la tarea
    this.store.dispatch(updateTask({ task: updatedTask }));
  }

  createTask(): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '700px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result, "result");
        
        this.store.dispatch(addTask({ task: result })); // Despacha la acción para agregar la nueva tarea
      }
    });
  }

  toggleCompletion(task: Task): void {
    // Alternar el estado de la tarea entre completada y pendiente
    const newStatus = task.status === 3 ? 2 : 3; // Si está completada (3), cambiar a pendiente (2) y viceversa
    this.updateTaskStatus(task, newStatus);
  }

  moveToPending(task: Task): void {
    // Mover tarea de Nuevas a Pendientes
    this.updateTaskStatus(task, 2); // Cambiar a estado de pendientes
  }
}
