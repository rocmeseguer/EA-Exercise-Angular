import { createTodo } from '../models/todo';
import { FilterTodoPipe, filterTodos } from './filter-todo.pipe';

describe('filterTodos (pure function)', () => {
    const todos = [
        createTodo('u1', '1', 'Learn Angular', true),
        createTodo('u1', '2', 'Learn Express', false),
        createTodo('u2', '3', 'Write tests', false)
    ];

    it('returns all todos with the default filter', () => {
        expect(filterTodos(todos)).toEqual(todos);
    });

    it('filters by completion status', () => {
        expect(filterTodos(todos, 'completed').map(t => t.id)).toEqual(['1']);
        expect(filterTodos(todos, 'pending').map(t => t.id)).toEqual(['2', '3']);
    });

    it('filters by search text (case-insensitive)', () => {
        expect(filterTodos(todos, 'all', '  LEARN ').map(t => t.id)).toEqual(['1', '2']);
    });

    it('does not mutate the original array', () => {
        const copy = [...todos];
        filterTodos(todos, 'pending', 'learn');
        expect(todos).toEqual(copy);
    });

    it('is used by the FilterTodoPipe', () => {
        expect(new FilterTodoPipe().transform(todos, 'pending', 'tests').map(t => t.id)).toEqual(['3']);
    });
});
