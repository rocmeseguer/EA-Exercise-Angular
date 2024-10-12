export class User {
    _id: string;
    name: string;
    email: string;
    username: string;


    constructor(name: string, email: string, username: string) {
        this._id = "";
        this.name = name;
        this.email = email;
        this.username = username;
    }   
}