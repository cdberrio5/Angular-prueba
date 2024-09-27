import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { addUser } from './../../store/users/user.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      skills: this.formBuilder.array([]) // Array para habilidades
    });
  }

  // Método para agregar una habilidad
  addSkill() {
    this.skills.push(this.formBuilder.control(''));
  }

  // Método para eliminar una habilidad
  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  get skills() {
    return this.userForm.get('skills') as FormArray;
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.userForm.valid) {
      this.store.dispatch(addUser({ user: this.userForm.value }));
      this.dialogRef.close();
    }
  }

  // Cerrar el diálogo sin guardar
  onCancel(): void {
    this.dialogRef.close();
  }
}
