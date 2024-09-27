import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { TaskService } from './../../core/services/task.service';
import { Task } from '../../models/task.model';
import { User } from '../../models/user.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {
  taskForm: FormGroup;
  isEditMode: boolean = false;
  taskId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(50)]],
      description: [''],
      dueDate: ['', Validators.required],
      isCompleted: [false],
      assignedUsers: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEditMode = true;
        this.taskId = +params['id'];
        // Aquí deberías cargar la tarea existente y poblar el formulario
        this.taskService.getTasks().subscribe(tasks => {
          const task = tasks.find(t => t.id === this.taskId);
          if (task) {
            this.taskForm.patchValue({
              title: task.title,
              description: task.description,
              dueDate: task.dueDate.toISOString().split('T')[0],
              isCompleted: task.isCompleted
            });
            task.assignedUsers.forEach(user => {
              this.addUser(user);
            });
          }
        });
      }
    });
  }

  get assignedUsers(): FormArray {
    return this.taskForm.get('assignedUsers') as FormArray;
  }

  addUser(user?: User) {
    const userGroup = this.fb.group({
      fullName: [user ? user.fullName : '', Validators.required],
      age: [user ? user.age : '', [Validators.required, Validators.min(1)]],
      skills: this.fb.array(user ? user.skills.map(skill => this.fb.control(skill)) : [])
    });
    this.assignedUsers.push(userGroup);
  }

  removeUser(index: number) {
    this.assignedUsers.removeAt(index);
  }

  getSkills(userIndex: number): FormArray {
    return this.assignedUsers.at(userIndex).get('skills') as FormArray;
  }

  addSkill(userIndex: number, skill?: string) {
    this.getSkills(userIndex).push(this.fb.control(skill || ''));
  }

  removeSkill(userIndex: number, skillIndex: number) {
    this.getSkills(userIndex).removeAt(skillIndex);
  }

  onSubmit() {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const formValue = this.taskForm.value;
    const task: Task = {
      id: this.taskId || 0,
      title: formValue.title,
      description: formValue.description,
      dueDate: new Date(formValue.dueDate),
      isCompleted: formValue.isCompleted,
      assignedUsers: formValue.assignedUsers
    };

    if (this.isEditMode && this.taskId) {
      this.taskService.updateTask(task).subscribe(() => {
        this.router.navigate(['/tasks']);
      });
    } else {
      this.taskService.createTask(task);
      this.router.navigate(['/tasks']);
    }
  }
}
