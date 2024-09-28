import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { User } from './../../models/user.model';
import { Task } from './../../models/task.model';
import { UserService } from './../../core/services/user.service'; // Servicio para buscar usuarios
import { selectAllUsers } from './../../store/users/user.selector'; // Selector para obtener todos los usuarios
import { loadUsers } from './../../store/users/user.actions'; // Acción para cargar usuarios

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  taskForm: FormGroup;
  filteredUsers: User[] = [];
  userSearchControl = this.fb.control('');
  allUsers$: Observable<User[]>; // Observable para usuarios
  assignedUsers!: FormArray;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { task: Task },
    private dialogRef: MatDialogRef<TaskDetailComponent>,
    private fb: FormBuilder,
    private store: Store
  ) {
    this.taskForm = this.fb.group({
      title: [{ value: this.data.task.title, disabled: true }, Validators.required],
      description: [{ value: this.data.task.description, disabled: true }],
      deadline: [{ value: this.convertToDateString(this.data.task.deadline), disabled: true }, Validators.required],
      assignedUsers: this.fb.array([]) // Inicializa el FormArray vacío
    });

    this.assignedUsers = this.taskForm.get('assignedUsers') as FormArray;

    // Obtén el observable de usuarios desde el store
    this.allUsers$ = this.store.pipe(select(selectAllUsers));
  }

  ngOnInit(): void {
    // Carga usuarios si no están cargados
    this.store.dispatch(loadUsers());

    // Suscríbete a los usuarios y carga los asignados
    this.allUsers$.pipe(
      tap(users => {
        this.filteredUsers = users; // Asigna todos los usuarios al inicio
      })
    ).subscribe();

    this.loadAssignedUsers();
  }

  convertToDateString(dateString: Date): string {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses son 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  loadAssignedUsers() {
    if (this.assignedUsers) {
      this.assignedUsers.clear();
      this.data.task.assignedUsers.forEach(user => {
        this.assignedUsers.push(this.fb.group({
          id: [user.id],
          name: [user.fullName],
          age: [user.age],
          skills: [user.skills]
        }));
      });
    }
  }

  removeUser(index: number) {
    this.assignedUsers.removeAt(index);
  }

  addAssignedUser(user: User) {
    this.assignedUsers.push(this.fb.group({
      id: [user.id],
      name: [user.fullName],
      age: [user.age],
      skills: [user.skills]
    }));
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.data.task,
        assignedUsers: this.assignedUsers.value
      };
      this.dialogRef.close(taskData);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  filterUsers(searchTerm: string | null) {
    if (!searchTerm) {
      this.allUsers$.subscribe(users => this.filteredUsers = users); // Muestra todos los usuarios si no hay término de búsqueda
      return;
    }

    this.filteredUsers = this.filteredUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onUserSelected(user: { id: any; age: number; name: any; skills: any; }): void {
    const userAlreadyAssigned = this.assignedUsers.controls.some(control => control.get('id')?.value === user.id);
    
    if (!userAlreadyAssigned && user.age >= 18 && user.skills.length > 0) {
      const userForm = this.fb.group({
        id: [user.id],
        name: [user.name],
        age: [user.age],
        skills: this.fb.array(user.skills || [])
      });
  
      this.assignedUsers.push(userForm);
      this.userSearchControl.setValue('');
    } else {
      let errorMessage = '';
      if (userAlreadyAssigned) {
        errorMessage = 'El usuario ya está asignado.';
      } else if (user.age < 18) {
        errorMessage = 'El usuario debe ser mayor de 18 años.';
      } else if (user.skills.length === 0) {
        errorMessage = 'El usuario debe tener al menos una habilidad.';
      }
  
      this.userSearchControl.setValue('');
      this.showError(errorMessage);
    }
  }

  showError(message: string) {
    console.error(message); 
  }
}
