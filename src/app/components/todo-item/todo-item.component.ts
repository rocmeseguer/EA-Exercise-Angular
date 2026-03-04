import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Todo } from '../../models/todo';

/**
 * ============================================
 * COMPONENT ARCHITECTURE - INPUT/OUTPUT
 * ============================================
 * This component demonstrates parent-child communication:
 * 
 * @Input() - Parent passes data TO child
 *   - The parent component passes a Todo object to this child
 * 
 * @Output() - Child emits events TO parent
 *   - The child emits events when user clicks buttons
 *   - Parent handles these events
 * 
 * This is the standard pattern for component hierarchy in Angular.
 */
@Component({
    selector: 'app-todo-item',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './todo-item.component.html',
    styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent {
    
    /**
     * ============================================
     * TYPESCRIPT - INPUT PROPERTY TYPING
     * ============================================
     * The @Input() decorator receives data from the parent component.
     * Type is explicitly defined as Todo interface.
     */
    @Input() todo!: Todo;

    /**
     * ============================================
     * OUTPUT - EVENT EMITTER
     * ============================================
     * @Output() allows the child component to emit events to the parent.
     * EventEmitter<T> ensures type safety when emitting data.
     */
    @Output() view = new EventEmitter<string>();
    @Output() edit = new EventEmitter<Todo>();
    @Output() delete = new EventEmitter<string>();

    /**
     * ============================================
     * EVENT BINDING - METHODS CALLED FROM TEMATE
     * ============================================
     * These methods are bound to click events in the template.
     * They emit events to the parent component.
     */
    
    onView(): void {
        this.view.emit(this.todo.id);
    }

    onEdit(): void {
        this.edit.emit(this.todo);
    }

    onDelete(): void {
        this.delete.emit(this.todo.id);
    }
}
