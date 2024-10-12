export class Todo {
    _id: string;
    name: string;
    user: string | undefined;
    completed: boolean;

    constructor(name: string, user?: string, completed?: boolean) {
        this._id = Todo.generateMongoId();
        this.name = name;
        this.user = user;
        this.completed = ( completed ? completed : false );
    }   

    static generateMongoId(): string {
        // Timestamp en segundos (4 bytes)
        const timestamp = Math.floor(Date.now() / 1000).toString(16);
    
        // Generar una cadena aleatoria de 16 caracteres para simular los 8 bytes restantes
        const random = 'xxxxxxxxxxxxxxxx'.replace(/x/g, () => {
          return Math.floor(Math.random() * 16).toString(16);
        });
    
        // Concatenar el timestamp con la cadena aleatoria para formar un ObjectId de 24 caracteres
        return timestamp + random;
      }
}

  