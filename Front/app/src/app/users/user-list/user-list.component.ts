import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from './../../models/user.model';
import { UserService } from './../../core/services/user.service';
import { loadUsers, addUser, deleteUser, updateUser } from './../../store/users/user.actions';
import { Observable } from 'rxjs';
import { selectAllUsers } from './../../store/users/user.selector';
import { map } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './../user-form/user-form.component';
import { UserDetailComponent } from './../user-detail/user-detail.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users$: Observable<User[]> | undefined;
  userForm: FormGroup;
  searchQuery: string = '';
  filteredUserList$: Observable<User[]> | undefined;

  constructor(private fb: FormBuilder, private store: Store<{ users: User[] }>, public dialog: MatDialog) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      skills: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    console.log('Action loadUsers dispatched');
    this.loadUsers();
    this.users$ = this.store.select(selectAllUsers);

    // Inicializa la lista filtrada con todos los usuarios
    this.filteredUserList$ = this.users$;
  }

  private loadUsers() {
    console.log('Despachando loadUsers');
    this.store.dispatch(loadUsers());
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        id: null, // Deja que la API asigne el ID
        fullName: this.userForm.value.fullName,
        age: this.userForm.value.age,
        skills: this.userForm.value.skills
      };

      this.store.dispatch(addUser({ user: newUser }));
      this.userForm.reset();
    }
  }

  editUser(user: User) {
    this.userForm.patchValue(user);
  }

  filterUsers(): void {
    if (this.users$) {
      this.filteredUserList$ = this.users$.pipe(
        map(users =>
          users.filter(user =>
            user.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            user.age.toString().includes(this.searchQuery)
          )
        )
      );
    }
  }

  searchUsers(): void {
    this.filterUsers(); // Implementa esta función si tienes lógica adicional
  }

  openUserForm(): void {
    const dialogRef = this.dialog.open(UserFormComponent, {
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Manejar los datos devueltos aquí (por ejemplo, agregar el nuevo usuario a la lista)
        console.log('Usuario creado:', result);
      }
    });
  }

  openUserDetail(user: User) {
    const dialogRef = this.dialog.open(UserDetailComponent, {
      width: '400px',
      data: user // Pasa los datos del usuario
    });

    dialogRef.afterClosed().subscribe(result => {
      // Puedes manejar cualquier lógica después de que el modal se cierra si es necesario
    });
  }
}
