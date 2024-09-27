import { Component, OnInit } from '@angular/core';
import { TaskService } from './../../core/services/task.service';
import { User } from './../../models/user.model';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      skills: this.fb.array([], Validators.required)
    });
  }

  ngOnInit(): void {
    this.taskService.getTasks().subscribe(tasks => {
      const allUsers = tasks.flatMap(task => task.assignedUsers);
      this.users = Array.from(new Map(allUsers.map(user => [user.id, user])).values());
    });
  }

  get skills(): FormArray {
    return this.userForm.get('skills') as FormArray;
  }

  addUser() {
    if (this.userForm.valid) {
      const newUser: User = {
        id: this.users.length + 1,
        fullName: this.userForm.value.fullName,
        age: this.userForm.value.age,
        skills: this.userForm.value.skills
      };

      this.users.push(newUser);
      this.userForm.reset();
    }
  }

  removeUser(id: number) {
    this.users = this.users.filter(user => user.id !== id);
  }

  addSkill() {
    this.skills.push(this.fb.group({
      skillName: ['', Validators.required],
      experience: ['', Validators.required]
    }));
  }

  removeSkill(index: number) {
    this.skills.removeAt(index);
  }

  onSubmit() {
    this.addUser();
  }
}
