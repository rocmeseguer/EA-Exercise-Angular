import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

/**
 * ============================================
 * FORMS MODULE - For Two-way Binding
 * ============================================
 * FormsModule provides ngModel directive for two-way binding.
 * We import it in the imports array.
 */
import { FormsModule } from '@angular/forms';

import { Todo, createTodo } from '../../models/todo';
import { TodoService } from '../../services/todo-service.service';

/**
 * ============================================
 * REACTIVE FORMS - Form Validation
 * ============================================
 * This component demonstrates:
 * - Reactive Forms with validators
 * - Two-way binding with [(ngModel)]
 * - Observable handling in HTTP calls
 */
@Component({
    selector: 'app-create-element',
    standalone: true,
    imports: [
        ReactiveFormsModule, 
        CommonModule,
        FormsModule  // Required for [(ngModel)] two-way binding
    ],
    templateUrl: './create-element.component.html',
    styleUrls: ['./create-element.component.css']
})
export class CreateElementComponent implements OnInit {

    /**
     * ============================================
     * TYPESCRIPT - OPTIONAL PROPERTIES
     * ============================================
     * Optional properties marked with '?'
     */
    _todoId?: string;

    /**
     * ============================================
     * REACTIVE FORMS - FormGroup Configuration
     * ============================================
     * FormGroup manages the entire form state.
     * FormControl handles each input field.
     * Validators provide validation rules.
     */
    _form = new FormGroup({
        userId: new FormControl('', Validators.required),
        id: new FormControl('', Validators.required),
        title: new FormControl('', [Validators.required, Validators.minLength(3)]),
        completed: new FormControl(false)
    });

    /**
     * ============================================
     * TWO-WAY BINDING - Additional field
     * ============================================
     * This field demonstrates two-way binding with [(ngModel)].
     * Changes in the input update the property and vice versa.
     * This is separate from the Reactive Form.
     */
    _description: string = '';

    /**
     * ============================================
     * DEPENDENCY INJECTION
     * ============================================
     */
    constructor(
        private _route: ActivatedRoute,
        private _todoService: TodoService
    ) { }

    /**
     * ============================================
     * LIFECYCLE HOOK - OnInit
     * ============================================
     */
    ngOnInit(): void {
        this._todoId = this._route.snapshot.paramMap.get('id') || undefined;
        if (this._todoId) {
            this.loadTodo(this._todoId);
        }
    }

    /**
     * ============================================
     * OBSERVABLE - Load data for editing
     * ============================================
     * Demonstrates handling Observable response.
     */
    loadTodo(id: string): void {
        this._todoService.getTodo(id)
            .subscribe({
                next: (todo: Todo) => {
                    if (todo) {
                        this._form.setValue({
                            userId: todo.userId,
                            id: todo.id,
                            title: todo.title,
                            completed: todo.completed
                        });
                    }
                },
                error: (error: unknown) => {
                    console.error('Error loading todo:', error);
                }
            });
    }

    /**
     * ============================================
     * EVENT BINDING - Form Submission
     * ============================================
     * Called when form is submitted.
     */
    onSubmit(): void {
        if (this._form.valid) {
            const todo: Todo = this._form.value as Todo;
            this.createTodo(todo);
            this._form.reset();
            this._description = '';  // Reset two-way bound field
        }
    }

    /**
     * ============================================
     * OBSERVABLE - Create new todo
     * ============================================
     * Sends data to API via Observable.
     */
    createTodo(todo: Todo): void {
        this._todoService.createTodo(todo)
            .subscribe({
                next: (data: Todo) => {
                    console.log('Todo created:', data);
                },
                error: (error: unknown) => {
                    console.error('Error creating todo:', error);
                }
            });
    }

    /**
     * ============================================
     * GETTER - For template access
     * ============================================
     * Provides convenient access to form controls.
     */
    get title() {
        return this._form.get('title');
    }
}
