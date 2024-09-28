import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from './../../models/task.model';
import { Store } from '@ngrx/store';
import { loadUsers } from './../../store/users/user.actions'; // Asegúrate de que la ruta es correcta
import { selectAllUsers } from './../../store/users/user.selector'; // Crea este selector
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  assignedUsers: FormArray;
  userSearchControl = new FormControl();
  filteredUsers: any[] = [];
  allUsers: User[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private store: Store // Inyectamos el Store
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      deadline: ['', Validators.required],
      assignedUsers: this.fb.array([])
    });

    this.assignedUsers = this.taskForm.get('assignedUsers') as FormArray;
  }

  ngOnInit(): void {
    // Cargamos los usuarios desde el store
    this.store.dispatch(loadUsers());

    // Seleccionamos los usuarios del estado
    this.store.select(selectAllUsers).subscribe(users => {
      this.allUsers = users;
      this.filteredUsers = users; // Inicializamos filteredUsers
    });
  }

  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.allUsers; 
      return;
    }
    
    this.filteredUsers = this.allUsers.filter(user =>
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

  removeUser(index: number): void {
    this.assignedUsers.removeAt(index);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Task = {
        ...this.taskForm.value,
        assignedUsers: this.assignedUsers.value
      };
      this.dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
