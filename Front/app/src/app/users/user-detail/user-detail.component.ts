import { Component, Inject } from '@angular/core'; // Import Angular core components
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import Material dialog reference and data injection
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms'; // Import form-related classes for building forms and validation
import { Store } from '@ngrx/store'; // Import NgRx store for state management
import { updateUser, deleteUser } from './../../store/users/user.actions'; // Import action creators for updating and deleting users

@Component({
  selector: 'app-user-detail', // Component selector used in HTML
  templateUrl: './user-detail.component.html', // HTML template for the component
  styleUrls: ['./user-detail.component.scss'] // Styles for the component
})
export class UserDetailComponent {
  userForm: FormGroup; // FormGroup to manage user data input

  constructor(
    public dialogRef: MatDialogRef<UserDetailComponent>, // Reference to the dialog for closing it
    private formBuilder: FormBuilder, // FormBuilder to create reactive forms
    private store: Store, // Store for dispatching actions
    @Inject(MAT_DIALOG_DATA) public data: any // Injected data representing the user to be modified
  ) {
    // Initialize the form with validation rules
    this.userForm = this.formBuilder.group({
      fullName: [data.fullName, Validators.required], // Full name input with required validation
      age: [data.age, [Validators.required, Validators.min(1)]], // Age input with required and minimum value validation
      skills: this.formBuilder.array(data.skills ? data.skills.map((skill: any) => this.formBuilder.control(skill)) : []) // Skills input as a FormArray, populated with existing skills
    });
  }

  // Method to submit the form for updating the user
  onUpdate() {
    if (this.userForm.valid) { // Check if the form is valid
      // Dispatch the updateUser action with the user data, including the ID
      this.store.dispatch(updateUser({ user: { ...this.userForm.value, id: this.data.id } }));
      this.dialogRef.close(); // Close the dialog after updating
    }
  }

  // Method to delete the user
  onDelete() {
    // Dispatch the deleteUser action with the user ID
    this.store.dispatch(deleteUser({ id: this.data.id }));
    this.dialogRef.close(); // Close the dialog after deletion
  }

  // Close the dialog without making any changes
  onCancel(): void {
    this.dialogRef.close(); // Simply close the dialog
  }

  // Getter to access the FormArray of skills
  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray; // Return the skills FormArray
  }

  // Method to add a new skill
  addSkill(): void {
    this.skills.push(this.formBuilder.control('')); // Add an empty control to the skills FormArray
  }

  // Method to remove a specific skill
  removeSkill(index: number): void {
    this.skills.removeAt(index); // Remove the skill at the specified index from the FormArray
  }
}
