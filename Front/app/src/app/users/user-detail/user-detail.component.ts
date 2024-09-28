import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateUser, deleteUser } from './../../store/users/user.actions';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {
  userForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>,
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe el usuario a modificar
  ) {
    // Inicialización del formulario con validaciones
    this.userForm = this.formBuilder.group({
      fullName: [data.fullName, Validators.required],
      age: [data.age, [Validators.required, Validators.min(1)]],
      skills: this.formBuilder.array(data.skills ? data.skills.map((skill: any) => this.formBuilder.control(skill)) : [])
    });
  }

  // Método para enviar el formulario con la actualización
  onUpdate() {
    if (this.userForm.valid) {
      this.store.dispatch(updateUser({ user: { ...this.userForm.value, id: this.data.id } }));
      this.dialogRef.close();
    }
  }

  // Método para eliminar el usuario
  onDelete() {
    this.store.dispatch(deleteUser({ id: this.data.id }));
    this.dialogRef.close();
  }

  // Cerrar el diálogo sin realizar cambios
  onCancel(): void {
    this.dialogRef.close();
  }

  // Getter para acceder al FormArray de skills
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  // Método para agregar una nueva habilidad
  addSkill(): void {
    this.skills.push(this.formBuilder.control('')); // Agrega un control vacío al array
  }

  // Método para eliminar una habilidad específica
  removeSkill(index: number): void {
    this.skills.removeAt(index); // Elimina la habilidad en el índice especificado
  }
}
