import { Component, Inject } from '@angular/core'; // Import necessary Angular core modules
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; // Import Material dialog references
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'; // Import Angular forms utilities
import { Store } from '@ngrx/store'; // Import NgRx Store for state management
import { addUser } from './../../store/users/user.actions'; // Import the action to add a user

@Component({
  selector: 'app-user-form', // Component selector
  templateUrl: './user-form.component.html', // Template URL for the component
  styleUrls: ['./user-form.component.scss'] // Stylesheet for the component
})
export class UserFormComponent {
  userForm: FormGroup; // Declare the form group for user data

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>, // Reference to the dialog for closing it
    private formBuilder: FormBuilder, // Inject FormBuilder to create reactive forms
    private store: Store, // Inject the NgRx Store for state management
    @Inject(MAT_DIALOG_DATA) public data: any // Inject dialog data, if any
  ) {
    // Initialize the form with controls and validations
    this.userForm = this.formBuilder.group({
      fullName: ['', Validators.required], // Full name field is required
      age: ['', [Validators.required, Validators.min(1)]], // Age field is required and must be at least 1
      skills: this.formBuilder.array([]) // Initialize skills as an empty FormArray
    });
  }

  // Method to add a new skill to the FormArray
  addSkill() {
    this.skills.push(this.formBuilder.control('')); // Add an empty control for a new skill
  }

  // Method to remove a skill from the FormArray at the specified index
  removeSkill(index: number) {
    this.skills.removeAt(index); // Remove the skill control at the given index
  }

  // Getter to access the FormArray of skills
  get skills() {
    return this.userForm.get('skills') as FormArray; // Return the FormArray as a typed object
  }

  // Method to handle form submission
  onSubmit() {
    if (this.userForm.valid) { // Check if the form is valid
      this.store.dispatch(addUser({ user: this.userForm.value })); // Dispatch the addUser action with form values
      this.dialogRef.close(); // Close the dialog after submission
    }
  }

  // Method to close the dialog without saving
  onCancel(): void {
    this.dialogRef.close(); // Close the dialog
  }
}
