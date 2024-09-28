import { Injectable } from '@angular/core';  // Imports Injectable decorator from Angular core, used to inject services
import { HttpClient, HttpHeaders } from '@angular/common/http';  // Imports HttpClient and HttpHeaders for HTTP operations
import { Observable } from 'rxjs';  // Imports Observable to handle asynchronous data
import { User } from './../../models/user.model';  // Imports the User model, which defines the structure of user objects

/**
 * Injectable service that handles HTTP requests related to users.
 * This service interacts with the backend API for CRUD operations on user data.
 */
@Injectable({
  providedIn: 'root'  // Registers the service at the root level, making it available throughout the app
})
export class UserService {

  // Base URL of the user API where the backend endpoints are located
  private apiUrl = 'http://localhost:3000/api/users';

  /**
   * Constructor that injects the HttpClient service.
   * HttpClient is used to perform HTTP requests like GET, POST, PUT, DELETE, etc.
   * @param http - The HttpClient instance injected for handling HTTP operations.
   */
  constructor(private http: HttpClient) { }

  /**
   * Fetches all users from the backend API.
   * Sends a GET request to retrieve a list of users from the API.
   * @returns An Observable of an array of User objects.
   */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}`);
  }

  /**
   * Adds a new user to the backend API.
   * Sends a POST request with the user data to create a new user.
   * Includes HTTP headers to specify the content type as JSON.
   * @param user - The user object containing the new user data.
   * @returns An Observable of the newly created User object.
   */
  addUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  // Set Content-Type as JSON in the headers
    return this.http.post<User>(`${this.apiUrl}`, user, { headers });
  }

  /**
   * Updates an existing user in the backend API.
   * Sends a PUT request with the updated user data.
   * Includes HTTP headers to specify the content type as JSON.
   * @param user - The user object containing updated data, including the user ID.
   * @returns An Observable of the updated User object.
   */
  updateUser(user: User): Observable<User> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });  // Set Content-Type as JSON in the headers
    return this.http.put<User>(`${this.apiUrl}/${user.id}`, user, { headers });
  }
}
