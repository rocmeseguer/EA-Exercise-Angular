import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { Todo, createTodo } from '../../models/todo';
import { TodoService } from '../../services/todo-service.service';

/**
 * ============================================
 * COMPONENT - Element Detail View
 * ============================================
 * This component demonstrates:
 * - Route parameter handling
 * - Observable for async data
 * - Property binding for dynamic styling
 * - Interpolación for displaying data
 */
@Component({
    selector: 'app-element',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './element.component.html',
    styleUrls: ['./element.component.css']
})
export class ElementComponent implements OnInit {

    /**
     * ============================================
     * TYPESCRIPT - TYPE DEFINITIONS
     * ============================================
     * Using createTodo factory function for initialization.
     */
    _todo: Todo = createTodo();
    today: Date = new Date();
    private _id: string = '';

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
     * Gets route parameter and fetches todo data.
     */
    ngOnInit(): void {
        this._id = this._route.snapshot.paramMap.get('id') || '';
        console.log('ElementComponent ' + this._id);
        
        if (this._id) {
            this.getTodo(this._id);
        }
    }

    /**
     * ============================================
     * OBSERVABLE - Fetch single todo
     * ============================================
     * Demonstrates handling Observable response.
     */
    getTodo(id: string): void {
        this._todoService.getTodo(id)
            .subscribe({
                next: (data: Todo) => {
                    console.log(data);
                    this._todo = data;
                },
                error: (error: unknown) => {
                    console.error('Error fetching todo:', error);
                }
            });
    }
}
