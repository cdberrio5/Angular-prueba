import { Injectable } from '@angular/core';  // Imports the Injectable decorator from Angular's core package
import { HttpClient } from '@angular/common/http';  // Imports HttpClient to make HTTP requests to the backend
import { Observable } from 'rxjs';  // Imports Observable to handle asynchronous data streams
import { Task } from './../../models/task.model';  // Imports the Task model interface to define the structure of task objects

/**
 * Injectable service that handles HTTP requests related to tasks.
 * This service is used to communicate with the backend API for task-related operations.
 */
@Injectable({
  providedIn: 'root'  // Makes the service globally available in the application without needing to import it into modules
})
export class TaskService {

  // Base URL of the task API where the backend endpoints are hosted
  private apiUrl = 'http://localhost:3000/api/tasks';

  /**
   * Constructor that injects the HttpClient service to enable making HTTP requests.
   * @param http - The HttpClient instance injected for performing HTTP operations.
   */
  constructor(private http: HttpClient) { }

  /**
   * Retrieves all tasks from the backend API.
   * Sends a GET request to the API to fetch the list of tasks.
   * @returns An Observable of an array of Task objects. 
   */
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  /**
   * Adds a new task to the backend API.
   * Sends a POST request to create a new task in the backend.
   * @param task - The task object to be created.
   * @returns An Observable of the newly created Task object.
   */
  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  /**
   * Updates an existing task in the backend API.
   * Sends a PUT request to update the task with the specified ID.
   * @param task - The task object that contains the updated information.
   * @returns An Observable of the updated Task object.
   */
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
}
