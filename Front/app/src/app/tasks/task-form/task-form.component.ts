import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Task } from './../../models/task.model';
import { UserService } from './../../core/services/user.service'; // Servicio para buscar usuarios
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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
  allUsers: any[] = []; // Almacenar todos los usuarios
data: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TaskFormComponent>,
    private userService: UserService 
  ) {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', Validators.required],
      assignedUsers: this.fb.array([])
    });

    this.assignedUsers = this.taskForm.get('assignedUsers') as FormArray;
  }

  ngOnInit(): void {
    // Obtener todos los usuarios
    this.userService.getUsers().subscribe(users => {
      this.allUsers = users; // Asignar usuarios a allUsers
      // Suscribirse a los cambios del campo de búsqueda para filtrar
      this.userSearchControl.valueChanges.subscribe(value => {
        this.filterUsers(value); // Filtrar usuarios en función de la búsqueda
      });
    });
  }

  // Filtra los usuarios según el input
  private filterUsers(value: string): void {
    const filterValue = value.toLowerCase();
    this.filteredUsers = this.allUsers.filter(user => user.name.toLowerCase().includes(filterValue));
  }

  // Añadir un usuario al formulario sin permitir editar su información
  onUserSelected(user: { id: any; age: number; name: any; skills: any; }): void {
    // Validar que el usuario tenga al menos 18 años y no esté ya asignado
    if (!this.assignedUsers.controls.some(control => control.get('id')?.value === user.id) && user.age >= 18) {
      const userForm = this.fb.group({
        id: [user.id],
        name: [user.name],
        age: [user.age],
        skills: this.fb.array(user.skills || [])
      });

      this.assignedUsers.push(userForm);
      // Limpiar el campo de búsqueda después de seleccionar un usuario
      this.userSearchControl.setValue('');
    }
  }

  // Eliminar usuario de la lista
  removeUser(index: number): void {
    this.assignedUsers.removeAt(index);
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const taskData: Task = this.taskForm.value;
      // Aquí puedes manejar la lógica para enviar la tarea al backend
      console.log('Tarea enviada:', taskData);
      this.dialogRef.close(taskData); // Cerrar el diálogo y enviar la tarea
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  addUser() {
    // Este método se puede usar si necesitas lógica adicional para agregar un usuario
  }
}
