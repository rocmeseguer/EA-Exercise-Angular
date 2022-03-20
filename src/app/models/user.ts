export class User {
    _id?: number;
    id: number;
    name: string;
    email: string;
    username: string;


    constructor(id: number, name: string, email: string, username: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.username = username;
    }   
}