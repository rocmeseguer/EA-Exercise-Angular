/**
 * ============================================
 * TYPECRIPT - INTERFACE FOR DATA MODEL
 * ============================================
 * An interface defines the structure of an object.
 * Unlike classes, interfaces are only used for type checking at compile time.
 * This is the preferred way to define data models in TypeScript.
 */
export interface Todo {
    userId: string;
    id: string;
    title: string;
    completed: boolean;
}

/**
 * ============================================
 * FUNCTIONAL PROGRAMMING - Factory Function
 * ============================================
 * A factory function creates and returns a new Todo object.
 * This demonstrates functional programming patterns.
 */
export function createTodo(
    userId: string = "",
    id: string = "",
    title: string = "",
    completed: boolean = false
): Todo {
    return {
        userId,
        id,
        title,
        completed
    };
}

