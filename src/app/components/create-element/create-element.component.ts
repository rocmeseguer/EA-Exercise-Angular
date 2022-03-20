import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  form : FormGroup;
  users : User[] = [];
  message = "";

  constructor(private _fb: FormBuilder, private _userService: UserService, private _todoService: TodoService) {

    this.form = this._fb.group({
      "id": ['', Validators.required],
      "user": [''],
      "name": [''],
      "completed": [''],

    })

   }

  ngOnInit(): void {

    // Getting users list
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

  onSubmit() {

    // New Todo
    const newTodo : Todo = {
      id : this.form.get('id')?.value,
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

}
