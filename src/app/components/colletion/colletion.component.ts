import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { Todo } from '../../models/todo';
import { TodoService } from '../../services/todo-service.service';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { TodoFilterType, filterTodos } from '../../pipes/filter-todo.pipe';

/**
 * ============================================
 * COMPONENT ARCHITECTURE - STANDALONE COMPONENT
 * ============================================
 * This is a standalone component (no NgModule needed).
 * Since Angular 19 'standalone: true' is the default.
 * It demonstrates:
 * - Parent-child component communication with input()/output()
 * - Reactive Forms for user input
 * - Observable pattern for async data
 * - Signals & computed() for derived state
 * - Built-in control flow (@if, @for)
 * - Angular Material components (form field, toggles, list, progress bar)
 */
@Component({
    selector: 'app-colletion',
    imports: [
        ReactiveFormsModule,
        TodoItemComponent,
        // Angular Material: import only the components used in the template
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatListModule,
        MatProgressBarModule
    ],
    templateUrl: './colletion.component.html',
    styleUrl: './colletion.component.css'
})
export class CollectionComponent implements OnInit {

    /**
     * ============================================
     * REACTIVE FORMS
     * ============================================
     * FormGroup manages the form state and validation.
     * FormControl manages individual form fields.
     *
     * TYPED FORMS: { nonNullable: true } makes the value type 'string'
     * (not 'string | null') and reset() returns '' instead of null.
     */
    protected readonly form = new FormGroup({
        title: new FormControl('', { nonNullable: true })
    });

    /**
     * ============================================
     * SIGNALS - Component state
     * ============================================
     * STYLE GUIDE (v20+): members used only by the template are
     * 'protected' (visible to the template, hidden from other classes)
     * and 'readonly' (the signal reference never changes, only its value).
     * All properties have explicit types.
     * downloadedTodos: raw data from API
     * isLoading: tracks loading state for @if
     * filterStatus: current filter (all/completed/pending)
     * searchText: text applied when the form is submitted
     */
    protected readonly downloadedTodos = signal<Todo[]>([]);
    protected readonly isLoading = signal<boolean>(false);
    protected readonly filterStatus = signal<TodoFilterType>('all');
    protected readonly searchText = signal<string>('');
    protected readonly message = signal<string>('');

    /**
     * ============================================
     * COMPUTED SIGNAL - Derived state
     * ============================================
     * computed() derives a value from other signals.
     * It is recalculated automatically (and only) when
     * downloadedTodos, filterStatus or searchText change.
     * No need to call applyFilter() by hand anymore.
     * Reuses the pure function of the custom pipe.
     */
    protected readonly filteredTodos = computed<Todo[]>(() =>
        filterTodos(this.downloadedTodos(), this.filterStatus(), this.searchText())
    );

    /**
     * ============================================
     * DEPENDENCY INJECTION - inject()
     * ============================================
     * Services are injected with the inject() function.
     * Private properties are prefixed with underscore.
     */
    private readonly _router = inject(Router);
    private readonly _todoService = inject(TodoService);

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
        this.isLoading.set(true);

        this._todoService.getTodos()
            .subscribe({
                next: (data: Todo[]) => {
                    this.downloadedTodos.set(data);
                    this.isLoading.set(false);
                },
                error: (error: unknown) => {
                    console.error('Error fetching todos:', error);
                    this.message.set('Error loading todos');
                    this.isLoading.set(false);
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
        // TYPED FORMS: controls.title.value is typed as 'string'
        const title = this.form.controls.title.value;
        if (title === '') {
            this.message.set('Please enter a title');
            return;
        }
        this.message.set('');
        this.applyFilter();
    }

    /**
     * ============================================
     * SIGNALS - Updating state
     * ============================================
     * Changing a signal is enough: computed() updates the list.
     */
    onFilterStatusChange(status: TodoFilterType): void {
        this.filterStatus.set(status);
        this.applyFilter();
    }

    /**
     * ============================================
     * APPLY FILTER
     * ============================================
     * Copies the form search text into the searchText signal.
     * The filteredTodos computed signal does the rest.
     */
    applyFilter(): void {
        this.searchText.set(this.form.controls.title.value);
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
