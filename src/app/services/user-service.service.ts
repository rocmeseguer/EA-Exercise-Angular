import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:4000/api/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  deleteUser(id: string): Observable<User> {
    return this.http.delete<User>(this.url + '/' + id);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.url , user) ;
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  editUser(id: string, user: User): Observable<User> {
    return this.http.put<User>(this.url + '/' + id, user);
  }
}