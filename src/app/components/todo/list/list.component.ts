import {Component, OnInit, ViewChild} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { List_Todo } from 'src/app/contracts/list-todo';
import { TodoService } from 'src/app/todo.service';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  constructor(spinner: NgxSpinnerService,
    private todoService: TodoService) {
  
  }

displayedColumns: string[] = ['header', 'description','createdDate','updatedDate'];
  dataSource: MatTableDataSource<List_Todo> = null;ü

  async getTodos() {
    const allTodos: { totalCount?: number; todos: List_Todo[] } = await this.todoService.read();
    this.dataSource = new MatTableDataSource<List_Todo>(allTodos.todos);
  }
  

  async pageChanged() {
    await this.getTodos();
  }

  async ngOnInit() {
    await this.getTodos();
  }

}