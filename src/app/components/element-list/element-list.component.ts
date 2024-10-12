import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'

import { Todo } from 'src/app/models/todo';
import { TodoService } from '../../services/todo-service.service';


@Component({
  selector: 'app-element-list',
  templateUrl: './element-list.component.html',
  styleUrls: ['./element-list.component.css']
})
export class ElementListComponent implements OnInit {

  filteredTodos : Todo[] = []; // filtered
  downloadedTodos : Todo[] = []; // download
  message = "";
  form : UntypedFormGroup;

  constructor(
    private _fb: UntypedFormBuilder, 
    private _todoService: TodoService,
    private router: Router
  ) { 
    this.form = this._fb.group({
      "name": ['']
    })
  }

  ngOnInit(): void {
    this.getTodosList();
  }

  onSubmit() {

    // New Todo
    const name = this.form.get('name')?.value;
    this.filteredTodos = this.filterItems(this.downloadedTodos, name);

  }

  onEdit(todo: Todo) {
    this.router.navigate(['/elements/new', { todo: JSON.stringify(todo) }]);
  }

  onDelete(_id: string ) {
    this._todoService.deleteTodo(_id)
    .subscribe(res => {
      console.log(res);
      this.getTodosList();
      this.router.navigate(['/elements']);
    })
  }

     // Getting todos list
  getTodosList() {
     this._todoService.getTodos()
     .subscribe({
        next: data => {
          console.log(data);
          this.downloadedTodos = data;
          this.filteredTodos = this.downloadedTodos;
        }, 
          error: error => {
          console.log(error);
        }
      })
    }

 //Filter array items based on search criteria (query)
  filterItems(arr : Todo[], query : string) {
    return arr.filter(function(item) {
      return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })
  }


}


