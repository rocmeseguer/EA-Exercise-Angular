import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';  // Para obtener el parámetro

import { User } from '../../models/user';
import { UserService } from '../../services/user-service.service';
import { Todo } from 'src/app/models/todo';
import { TodoService } from '../../services/todo-service.service';

@Component({
  selector: 'app-create-element',
  templateUrl: './create-element.component.html',
  styleUrls: ['./create-element.component.css']
})
export class CreateElementComponent implements OnInit {

  form : UntypedFormGroup;
  users : User[] = [];
  todo : Todo;
  message = "";

  constructor(
    private _fb: UntypedFormBuilder, 
    private _userService: UserService, 
    private _todoService: TodoService,
    private route: ActivatedRoute // Para optener el parametro
  ) {

    this.form = this._fb.group({
      "user": ['', Validators.required],
      "name": ['', Validators.required],
      "completed": [''],

    })

    this.todo = {
      _id : "",
      name : "",
      user : "",
      completed : false
    }

   }

  ngOnInit(): void {

    // Getting users list
    this.getUsersList();

    // Obtener el 'Todo' pasado a través de la ruta llamada desde Edit
    const todoJson = this.route.snapshot.paramMap.get('todo');
    console.log("Parametro " + todoJson);

    if (todoJson) {
      this.todo = JSON.parse(todoJson);  // Parsear el JSON
      this.form.patchValue({
        name: this.todo.name,
        user: this.todo.user,
        completed: this.todo.completed,
      });
    }
  }

  onSubmit() {

    // New Todo
    const newTodo : Todo = {
      _id : (this.todo._id !== "" ? this.todo._id : Todo.generateMongoId()),
      name : this.form.get('name')?.value,
      user : this.form.get('user')?.value,
      completed : (this.form.get('completed')?.value ? true : false)
    }

    // POST of the new TODO
    this._todoService.addTodo(newTodo).subscribe({
      next: data => {
        console.log(data);
        this.message = "Created!"
      }, 
      error: error => {
      console.log(error);
      this.message = "Error!"
      }
    })
  }

  // Getting todos list
  getUsersList() {
    this._userService.getUsers().subscribe({
      next: data => {
        console.log(data);
        this.users = data;
      }, 
      error: error => {
      console.log(error);
      }
    })
  }
   

}
