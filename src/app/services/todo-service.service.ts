import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Todo, createTodo } from '../models/todo';
import { generateMongoId } from '../utils/mongo-id'

/**
 * ============================================
 * SERVICE - API REST CONSUMPTION
 * ============================================
 * This service demonstrates:
 * - HTTP Client for REST API calls
 * - Observable pattern for async operations
 * - Explicit TypeScript typing for parameters and returns
 */
@Injectable({
    providedIn: 'root'
})
export class TodoService {
    
    /**
     * ============================================
     * TYPESCRIPT - TYPED PROPERTIES
     * ============================================
     * Private properties with explicit types.
     */
    private readonly _url: string = 'https://jsonplaceholder.typicode.com/todos';

    /**
     * ============================================
     * DEPENDENCY INJECTION
     * ============================================
     * HttpClient is injected for making HTTP requests.
     */
    constructor(private _http: HttpClient) { }

    /**
     * ============================================
     * OBSERVABLE - GET all todos
     * ============================================
     * Returns Observable<Todo[]> - an array of Todo objects.
     * 
     * Key points:
     * - Explicit return type: Observable<Todo[]>
     * - Generic type parameter in get<Todo[]>
     * - Observable is lazy - won't execute until subscribed
     */
    getTodos(): Observable<Todo[]> {
        return this._http.get<Todo[]>(this._url);
    }

    /**
     * ============================================
     * OBSERVABLE - GET single todo by ID
     * ============================================
     * @param id - The todo ID (string)
     * @returns Observable<Todo> - single Todo object
     */
    getTodo(id: string): Observable<Todo> {
        return this._http.get<Todo>(`${this._url}/${id}`);
    }

    /**
     * ============================================
     * OBSERVABLE - DELETE todo (FAKE)
     * ============================================
     * Demonstrates using 'of' to create a fake response.
     * 
     * @param id - The todo ID to delete
     * @returns Observable<Todo> - returns a fake deleted todo
     * 
     * Note: Using fake response since JSONPlaceholder doesn't actually delete.
     */
    deleteTodo(id: string): Observable<Todo> {
        // Using 'of' to return a fake response (simulating deletion)
        // In real app: return this._http.delete<Todo>(`${this._url}/${id}`);
        
        const fakeDeletedTodo: Todo = createTodo(
            'deleted-user',
            id,
            'Deleted Todo',
            false
        );
        
        return of(fakeDeletedTodo);
    }

    /**
     * ============================================
     * OBSERVABLE - CREATE todo
     * ============================================
     * Demonstrates using 'of' to create an Observable from data.
     * 
     * @param todo - The Todo object to create
     * @returns Observable<Todo> - the created todo
     * 
     * Note: The API might not actually create it, so we return
     * a fake todo using 'of()' from RxJS.
     */
    createTodo(todo: Todo): Observable<Todo> {
        // Using 'of' to return a fake todo (simulating creation)
        // In real app: return this._http.post<Todo>(this._url, todo);
        
        const fakeTodo: Todo = createTodo(
            todo.userId,
            generateMongoId(),
            todo.title,
            todo.completed
        );
        
        return of(fakeTodo);
    }

    /**
     * ============================================
     * OBSERVABLE - UPDATE todo (FAKE)
     * ============================================
     * Demonstrates using 'of' to create a fake response.
     * 
     * @param id - The todo ID to update
     * @param todo - Partial Todo object with updates
     * @returns Observable<Todo> - returns a fake updated todo
     * 
     * Note: Using fake response since JSONPlaceholder doesn't actually update.
     */
    updateTodo(id: string, todo: Partial<Todo>): Observable<Todo> {
        // Using 'of' to return a fake todo (simulating update)
        // In real app: return this._http.patch<Todo>(`${this._url}/${id}`, todo);
        
        const fakeUpdatedTodo: Todo = createTodo(
            todo.userId || 'updated-user',
            id,
            todo.title || 'Updated Todo',
            todo.completed ?? false
        );
        
        return of(fakeUpdatedTodo);
    }
}
