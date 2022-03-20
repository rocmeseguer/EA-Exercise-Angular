import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  form : FormGroup;

  constructor(private _fb: FormBuilder, private _todoService: TodoService) { 
    this.form = this._fb.group({
      "name": ['']
    })
  }

  ngOnInit(): void {
    // Getting todos list
    this._todoService.getTodos().subscribe({
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

  onSubmit() {

    // New Todo
    const name = this.form.get('name')?.value;
    this.filteredTodos = filterItems(this.downloadedTodos, name);

  }


 
}

 //Filter array items based on search criteria (query)
 function filterItems(arr : Todo[], query : string) {
  return arr.filter(function(item) {
    return item.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
  })

}
