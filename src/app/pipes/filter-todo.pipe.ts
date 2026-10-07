import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

/**
 * ============================================
 * TYPESCRIPT - STRING LITERAL UNION TYPE
 * ============================================
 * Only these three values are allowed as filter type.
 */
export type TodoFilterType = 'all' | 'completed' | 'pending';

/**
 * ============================================
 * FUNCTIONAL PROGRAMMING - PURE FUNCTION
 * ============================================
 * Same inputs -> same output, no side effects, no mutation.
 * It is reused by the pipe (template) and by computed() (component).
 */
export function filterTodos(todos: Todo[], filterType: TodoFilterType = 'all', searchText: string = ''): Todo[] {
    const searchLower = searchText.toLowerCase().trim();

    return (todos ?? [])
        // Filter by completion status
        .filter(todo =>
            filterType === 'completed' ? todo.completed :
            filterType === 'pending' ? !todo.completed :
            true
        )
        // Filter by search text (case-insensitive)
        .filter(todo => todo.title.toLowerCase().includes(searchLower));
}

/**
 * ============================================
 * PIPES - CUSTOM PIPE
 * ============================================
 * Pipes transform data in the template.
 * This custom pipe filters todos by:
 * - completion status (completed/pending)
 * - search text
 *
 * Usage in template:
 * {{ todoArray | filterTodo:filterType:searchText }}
 */
@Pipe({
    name: 'filterTodo'
})
export class FilterTodoPipe implements PipeTransform {

    /**
     * ============================================
     * TYPESCRIPT - TYPED PARAMETERS & RETURN
     * ============================================
     * All function parameters and return types are explicitly defined.
     */
    transform(todos: Todo[], filterType: TodoFilterType = 'all', searchText: string = ''): Todo[] {
        return filterTodos(todos, filterType, searchText);
    }
}
