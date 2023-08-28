import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Create_Todo } from 'src/app/contracts/create-todo';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit{
  constructor(spiner: NgxSpinnerService, private todoService: TodoService) {
  }

  ngOnInit(): void {
  }
  @Output() createdTodo: EventEmitter<Create_Todo> = new EventEmitter();

  create(header: HTMLInputElement, description: HTMLInputElement) {
    const create_todo: Create_Todo = new Create_Todo();
    create_todo.header = header.value;
    create_todo.description = description.value;

    this.todoService.create(create_todo, () => {
      this.createdTodo.emit(create_todo);
    }, errorMessage => {
    });
  }
}