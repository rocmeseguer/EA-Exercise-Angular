import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Todo } from '../models/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {
  url = 'http://localhost:4000/api/todos';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.url );
  }

  deleteTodo(id: string): Observable<Todo> {
    return this.http.delete<Todo>(this.url + '/' + id);
  }

  addTodo(Todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.url , Todo) ;
  }

  getTodo(id: string): Observable<Todo> {
    return this.http.get<Todo>(this.url + '/' + id);
  }

  editTodo(id: string, Todo: Todo): Observable<Todo> {
    return this.http.put<Todo>(this.url + '/' + id, Todo);
  }
}