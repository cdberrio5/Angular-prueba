import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../core/services/task.service';
import { Task } from './../../models/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog'; // Importar para manejar la modal
import { TaskFormComponent } from '../task-form/task-form.component'; // Importar el componente del formulario

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  newTasks: Task[] = []; // Añadimos la lista de nuevas tareas
  pendingTasks: Task[] = [];
  completedTasks: Task[] = [];

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog // Inyectar MatDialog para manejar la modal
  ) { }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.newTasks = tasks.filter(task => task.status === 'new');
      this.pendingTasks = tasks.filter(task => task.status === 'pending');
      this.completedTasks = tasks.filter(task => task.status === 'completed');
    });
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      if (event.container.id === 'newList') {
        task.status = 'new';
      } else if (event.container.id === 'pendingList') {
        task.status = 'pending';
      } else if (event.container.id === 'completedList') {
        task.status = 'completed';
      }
      this.taskService.updateTask(task).subscribe(() => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
      });
    }
  }

  toggleCompletion(task: Task) {
    task.status = task.status === 'completed' ? 'pending' : 'completed';
    this.taskService.updateTask(task).subscribe();
  }

  createTask(): void {
    // Abrir la modal con el formulario de crear nueva tarea
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px', // Ajustar el tamaño de la modal
      data: {
        task: null // Pasamos null para indicar que estamos creando una nueva tarea
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Aquí creamos la tarea en la base de datos
        this.taskService.createTask(result).subscribe(newTask => {
          this.newTasks.push(newTask);
        });
      }
    });
  }

  moveToPending(task: Task) {
    task.status = 'pending';
    this.taskService.updateTask(task).subscribe(() => {
      if (this.newTasks.includes(task)) {
        this.newTasks = this.newTasks.filter(t => t.id !== task.id);
      } else if (this.completedTasks.includes(task)) {
        this.completedTasks = this.completedTasks.filter(t => t.id !== task.id);
      }
      this.pendingTasks.push(task);
    });
  }
}
