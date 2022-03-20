export class Todo {
    _id?: number;
    id: number;
    name: string;
    user: string | undefined;
    completed: boolean;

    constructor(id: number, name: string, user?: string, completed?: boolean) {
        this.id = id;
        this.name = name;
        this.user = user;
        this.completed = ( completed ? completed : false );
    }   
}