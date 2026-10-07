import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { DatePipe, UpperCasePipe } from '@angular/common';
import { catchError, of, switchMap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { createTodo } from '../../models/todo';
import { TodoService } from '../../services/todo-service.service';

/**
 * ============================================
 * COMPONENT - Element Detail View
 * ============================================
 * This component demonstrates:
 * - Route parameters as component inputs
 * - Observable -> Signal conversion (toObservable / toSignal)
 * - RxJS operators: switchMap, catchError
 * - Property binding for dynamic styling
 * - Interpolación for displaying data
 * - Angular Material card (mat-card)
 */
@Component({
    selector: 'app-element',
    imports: [UpperCasePipe, DatePipe, MatCardModule, MatIconModule],
    templateUrl: './element.component.html',
    styleUrl: './element.component.css'
})
export class ElementComponent {

    /**
     * ============================================
     * ROUTING - Route parameter as input()
     * ============================================
     * Route: { path: 'elements/:id', component: ElementComponent }
     * With provideRouter(routes, withComponentInputBinding()) (app.config.ts)
     * the router sets the ':id' parameter into the input with the same name.
     *
     * No ActivatedRoute, no snapshot, no ngOnInit.
     * And it is reactive: navigating from /elements/1 to /elements/2
     * reuses this component and only updates the id() signal.
     */
    readonly id = input.required<string>();

    /**
     * ============================================
     * DEPENDENCY INJECTION - inject()
     * ============================================
     */
    private readonly _todoService = inject(TodoService);

    /**
     * ============================================
     * SIGNALS + OBSERVABLES - Reactive data loading
     * ============================================
     * 1. toObservable(this.id): emits every time the id signal changes
     * 2. switchMap: for each id, call the API. If the id changes before
     *    the response arrives, the previous request is cancelled.
     * 3. catchError: on HTTP error, log it and emit an empty Todo
     * 4. toSignal: converts the result back to a signal for the template
     *    (it subscribes and unsubscribes automatically).
     * Using createTodo factory function for the initial value.
     *
     * STYLE GUIDE (v20+): members used only by the template are
     * 'protected' (visible to the template, hidden from other classes)
     * and 'readonly' (the reference never changes).
     */
    protected readonly todo = toSignal(
        toObservable(this.id).pipe(
            switchMap((id: string) => this._todoService.getTodo(id).pipe(
                catchError((error: unknown) => {
                    console.error('Error fetching todo:', error);
                    return of(createTodo());
                })
            ))
        ),
        { initialValue: createTodo() }
    );

    protected readonly today: Date = new Date();
}
