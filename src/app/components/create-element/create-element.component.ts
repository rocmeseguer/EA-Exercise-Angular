import { Component, OnInit, inject, signal } from '@angular/core';
import { JsonPipe, UpperCasePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

/**
 * ============================================
 * CHILD COMPONENT - For Two-way Binding
 * ============================================
 * DescriptionInputComponent exposes a model() signal,
 * so we can bind it with [(value)].
 */
import { DescriptionInputComponent } from '../description-input/description-input.component';

import { Todo, createTodo } from '../../models/todo';
import { TodoService } from '../../services/todo-service.service';

/**
 * ============================================
 * REACTIVE FORMS - Form Validation
 * ============================================
 * This component demonstrates:
 * - Reactive Forms with validators
 * - Two-way binding between components with model() and [( )]
 * - Observable handling in HTTP calls
 * - Angular Material form controls (mat-form-field, matInput, mat-checkbox)
 */
@Component({
    selector: 'app-create-element',
    imports: [
        ReactiveFormsModule,
        DescriptionInputComponent,  // Child component with model() for [( )]
        UpperCasePipe,
        JsonPipe,
        // Angular Material
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatCheckboxModule,
        MatButtonModule
    ],
    templateUrl: './create-element.component.html',
    styleUrl: './create-element.component.css'
})
export class CreateElementComponent implements OnInit {

    /**
     * ============================================
     * TYPESCRIPT - OPTIONAL PROPERTIES
     * ============================================
     * Optional properties marked with '?'
     *
     * STYLE GUIDE (v20+): members used only by the template are
     * 'protected' (visible to the template, hidden from other classes).
     */
    protected todoId?: string;

    /**
     * ============================================
     * REACTIVE FORMS - FormGroup Configuration
     * ============================================
     * FormGroup manages the entire form state.
     * FormControl handles each input field.
     * Validators provide validation rules.
     *
     * TYPED FORMS: { nonNullable: true } makes each value type exact
     * ('string', 'boolean' instead of 'string | null', ...) and
     * reset() goes back to the initial value instead of null.
     */
    protected readonly form = new FormGroup({
        userId: new FormControl('', { nonNullable: true, validators: Validators.required }),
        id: new FormControl('', { nonNullable: true, validators: Validators.required }),
        title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(3)] }),
        completed: new FormControl(false, { nonNullable: true })
    });

    /**
     * ============================================
     * TWO-WAY BINDING - Additional field
     * ============================================
     * This signal demonstrates two-way binding with a child component:
     *   <app-description-input [(value)]="description" />
     * Changes in the child input update this signal and vice versa.
     * This is separate from the Reactive Form.
     */
    protected readonly description = signal<string>('');

    /**
     * ============================================
     * DEPENDENCY INJECTION - inject()
     * ============================================
     */
    private readonly _todoService = inject(TodoService);

    /**
     * ============================================
     * LIFECYCLE HOOK - OnInit
     * ============================================
     */
    ngOnInit(): void {
        /**
         * ============================================
         * ROUTING - Lectura de datos por Navigation Extras
         * ============================================
         * history.state permite acceder a datos enviados via
         * navigate(['/ruta'], { state: { data: todo } })
         * No aparece en la URL, ideal para objetos complejos.
         */
        const navigation = history.state;
        if (navigation && navigation.data) {
            const todo: Todo = navigation.data;
            this.form.setValue({
                userId: todo.userId,
                id: todo.id,
                title: todo.title,
                completed: todo.completed
            });
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
                        this.form.setValue({
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
        if (this.form.valid) {
            /**
             * TYPED FORMS - getRawValue()
             * Returns { userId: string, id: string, title: string, completed: boolean }
             * which matches the Todo interface: no 'as Todo' cast needed.
             * (form.value would be Partial<...> because disabled controls are excluded)
             */
            const todo: Todo = this.form.getRawValue();
            this.createTodo(todo);
            this.form.reset();
            this.description.set('');  // Reset two-way bound field
        }
    }

    /**
     * ============================================
     * OBSERVABLE - Create new todo
     * ============================================
     * Sends data to API via Observable.
     * Observables are lazy: without subscribe() the request is never sent.
     */
    createTodo(todo: Todo): void {
        this._todoService.createTodo(todo)
            .subscribe({
                error: (error: unknown) => {
                    console.error('Error creating todo:', error);
                }
            });
    }
}
