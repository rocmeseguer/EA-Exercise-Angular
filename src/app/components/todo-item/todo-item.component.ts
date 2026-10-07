import { Component, input, output } from '@angular/core';
import { UpperCasePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Todo } from '../../models/todo';

/**
 * ============================================
 * COMPONENT ARCHITECTURE - INPUT/OUTPUT
 * ============================================
 * This component demonstrates parent-child communication:
 *
 * input() - Parent passes data TO child
 *   - The parent component passes a Todo object to this child
 *
 * output() - Child emits events TO parent
 *   - The child emits events when user clicks buttons
 *   - Parent handles these events
 *
 * Angular 21: input()/output() functions replace the
 * @Input()/@Output() decorators.
 *
 * ANGULAR MATERIAL: the template is a <mat-list-item>
 * rendered inside the parent's <mat-list>.
 */
@Component({
    selector: 'app-todo-item',
    imports: [UpperCasePipe, MatListModule, MatIconModule, MatButtonModule, MatTooltipModule],
    templateUrl: './todo-item.component.html',
    styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {

    /**
     * ============================================
     * SIGNAL INPUT - input.required<T>()
     * ============================================
     * Receives data from the parent component.
     * It is a read-only signal: read it with todo() in TS and template.
     * 'required' means the parent MUST bind [todo]
     * (no more 'todo!: Todo' non-null assertion).
     */
    todo = input.required<Todo>();

    /**
     * ============================================
     * OUTPUT - output<T>()
     * ============================================
     * output() allows the child component to emit events to the parent.
     * The generic <T> ensures type safety when emitting data.
     */
    view = output<string>();
    edit = output<Todo>();
    delete = output<string>();

    /**
     * ============================================
     * EVENT BINDING - METHODS CALLED FROM TEMPLATE
     * ============================================
     * These methods are bound to click events in the template.
     * They emit events to the parent component.
     */

    onView(): void {
        this.view.emit(this.todo().id);
    }

    onEdit(): void {
        this.edit.emit(this.todo());
    }

    onDelete(): void {
        this.delete.emit(this.todo().id);
    }
}
