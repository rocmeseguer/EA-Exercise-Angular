import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from '../models/todo';

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
    name: 'filterTodo',
    standalone: true
})
export class FilterTodoPipe implements PipeTransform {
    
    /**
     * ============================================
     * TYPESCRIPT - TYPED PARAMETERS & RETURN
     * ============================================
     * All function parameters and return types are explicitly defined.
     */
    transform(todos: Todo[], filterType: string = 'all', searchText: string = ''): Todo[] {
        if (!todos) {
            return [];
        }

        let filtered = todos;

        // Filter by completion status
        if (filterType === 'completed') {
            filtered = filtered.filter(todo => todo.completed);
        } else if (filterType === 'pending') {
            filtered = filtered.filter(todo => !todo.completed);
        }

        // Filter by search text (case-insensitive)
        if (searchText && searchText.trim() !== '') {
            const searchLower = searchText.toLowerCase().trim();
            filtered = filtered.filter(todo => 
                todo.title.toLowerCase().includes(searchLower)
            );
        }

        return filtered;
    }
}
