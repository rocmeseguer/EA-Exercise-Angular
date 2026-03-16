import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo-service.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { FilterTodoPipe } from '../../pipes/filter-todo.pipe';

/**
 * ============================================
 * COMPONENT ARCHITECTURE - STANDALONE COMPONENT
 * ============================================
 * This is a standalone component (no NgModule needed).
 * It demonstrates:
 * - Parent-child component communication with Input/Output
 * - Reactive Forms for user input
 * - Observable pattern for async data
 * - Custom pipes for data transformation
 */
@Component({
    selector: 'app-colletion',
    standalone: true,
    imports: [
        CommonModule, 
        ReactiveFormsModule,
        TodoItemComponent,
        FilterTodoPipe
    ],
    templateUrl: './colletion.component.html',
    styleUrls: ['./colletion.component.css']
})
export class CollectionComponent implements OnInit {

    /**
     * ============================================
     * REACTIVE FORMS
     * ============================================
     * FormGroup manages the form state and validation.
     * FormControl manages individual form fields.
     */
    _form = new FormGroup({
        title: new FormControl('')
    });

    /**
     * ============================================
     * TYPESCRIPT - TYPE DEFINITIONS
     * ============================================
     * All properties have explicit types.
     * _downloadedTodos: raw data from API
     * _filteredTodos: data after applying filters
     * _isLoading: tracks loading state for *ngIf
     * _filterStatus: current filter (all/completed/pending)
     */
    _filteredTodos: Todo[] = [];
    _downloadedTodos: Todo[] = [];
    _isLoading: boolean = false;
    _filterStatus: string = 'all';
    _message: string = '';

    /**
     * ============================================
     * DEPENDENCY INJECTION
     * ============================================
     * Services are injected via the constructor.
     * Private properties are prefixed with underscore.
     */
    constructor(
        private _router: Router,
        private _todoService: TodoService
    ) { }

    /**
     * ============================================
     * LIFECYCLE HOOK - OnInit
     * ============================================
     * Called after Angular initializes the component.
     * Good place to fetch initial data.
     */
    ngOnInit(): void {
        this.getTodosList();
    }

    /**
     * ============================================
     * OBSERVABLE - HTTP CLIENT
     * ============================================
     * The service returns an Observable.
     * We subscribe to handle the response.
     * 
     * Key differences from Promises:
     * - Observable is lazy (doesn't execute until subscribed)
     * - Observable can emit multiple values over time
     * - Observable can be cancelled
     */
    getTodosList(): void {
        this._isLoading = true;
        
        this._todoService.getTodos()
            .subscribe({
                next: (data: Todo[]) => {
                    this._downloadedTodos = data;
                    this.applyFilter();
                    this._isLoading = false;
                },
                error: (error: unknown) => {
                    console.error('Error fetching todos:', error);
                    this._message = 'Error loading todos';
                    this._isLoading = false;
                }
            });
    }

    /**
     * ============================================
     * EVENT BINDING - Form Submission
     * ============================================
     * Called when form is submitted via (ngSubmit).
     */
    onSubmit(): void {
        const title = this._form.get('title')?.value;
        if (title === null || title === '') {
            this._message = 'Please enter a title';
            return;
        }
        this.applyFilter();
    }

    /**
     * ============================================
     * FUNCTIONAL PROGRAMMING
     * ============================================
     * Filter function using array filter method.
     * Demonstrates functional programming with arrow functions.
     */
    onFilterStatusChange(status: string): void {
        this._filterStatus = status;
        this.applyFilter();
    }

    /**
     * ============================================
     * APPLY CUSTOM PIPE
     * ============================================
     * Uses the custom FilterTodoPipe to transform data.
     * In the template, this is done automatically:
     * {{ todos | filterTodo:filterStatus:searchText }}
     */
    applyFilter(): void {
        const searchText = this._form.get('title')?.value || '';
        this._filteredTodos = this._downloadedTodos.filter(todo => {
            let matchesStatus = true;
            let matchesSearch = true;

            if (this._filterStatus === 'completed') {
                matchesStatus = todo.completed;
            } else if (this._filterStatus === 'pending') {
                matchesStatus = !todo.completed;
            }

            if (searchText) {
                matchesSearch = todo.title.toLowerCase().includes(searchText.toLowerCase());
            }

            return matchesStatus && matchesSearch;
        });
    }

    /**
     * ============================================
     * OUTPUT EVENTS - Handle child component events
     * ============================================
     * These methods handle events emitted by TodoItemComponent.
     * The child component emits events, parent handles them.
     */
    onView(id: string): void {
        this._router.navigate(['/elements/' + id]);
    }

/**
 * ============================================
 * ROUTING - Paso de datos en Routing (Navigation Extras)
 * ============================================
 * Se pasa el objeto Todo completo via Navigation Extras (state).
 * No aparece en la URL, es más seguro para datos sensibles.
 * Se recupera en el destino con: history.state
 */
    onEdit(todo: Todo): void {
        this._router.navigate(['/elements/new'], {
            state: { data: todo }
        });
    }
    onDelete(id: string): void {
        const confirmed = window.confirm('Estàs segur que vols eliminar aquesta tasca? Aquesta acció no es pot desfer.');

        if (confirmed) {
            this._todoService.deleteTodo(id)
                .subscribe({
                    next: () => {
                        this.getTodosList();
                    },
                    error: (error: unknown) => {
                        console.error('Error deleting todo:', error);
                    }
                });
        }
    }
}
