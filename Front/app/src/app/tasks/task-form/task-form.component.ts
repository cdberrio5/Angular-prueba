import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from './../../models/task.model';
import { UserService } from './../../core/services/user.service'; // Servicio para buscar usuarios

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
  allUsers: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private userService: UserService 
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
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users;
    });
  }

  // Filtra los usuarios según el input
  filterUsers(searchTerm: string) {
    if (!searchTerm) {
      this.filteredUsers = this.allUsers; // Suponiendo que `allUsers` contiene todos los usuarios
      return;
    }
    
    this.filteredUsers = this.allUsers.filter(user =>
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  onUserSelected(user: { id: any; age: number; name: any; skills: any; }): void {
    // Verifica si el usuario ya está en la lista asignada
    const userAlreadyAssigned = this.assignedUsers.controls.some(control => control.get('id')?.value === user.id);
    
    // Verifica si el usuario es mayor de 18 y tiene al menos una habilidad
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
      // Muestra el mensaje de error adecuado
      let errorMessage = '';
      if (userAlreadyAssigned) {
        errorMessage = 'El usuario ya está asignado.';
      } else if (user.age < 18) {
        errorMessage = 'El usuario debe ser mayor de 18 años.';
      } else if (user.skills.length === 0) {
        errorMessage = 'El usuario debe tener al menos una habilidad.';
      }
  
      // Mostrar el mensaje de error (puedes utilizar un mat-snack-bar, alert, etc.)
      this.showError(errorMessage);
    }
  }
  
  // Función para mostrar el mensaje de error
  showError(message: string) {
    // Aquí puedes usar mat-snack-bar u otro método para mostrar el error
    console.error(message); // Por ahora solo se muestra en la consola
  }

  // Eliminar usuario de la lista
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
