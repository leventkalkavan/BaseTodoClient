import { Injectable } from '@angular/core';
import { HttpClientService } from './http-client.service';
import { Create_Todo } from './contracts/create-todo';
import { HttpErrorResponse } from '@angular/common/http';
import { List_Todo } from './contracts/list-todo';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  constructor(private httpClientService: HttpClientService) { }

  create(todo: Create_Todo, successCallBack: () => void, errorCallBack: (errorMessage: string) => void) {
    this.httpClientService.post({
      controller: "todos"
    }, todo)
      .subscribe(result => {
        successCallBack();
      }, (errorResponse: HttpErrorResponse) => {
        const _error: Array<{ key: string, value: Array<string> }> = errorResponse.error;
        let message = "";
        _error.forEach((v, index) => {
          v.value.forEach((_v, _index) => {
            message += `${_v}<br>`;
          });
        });
        errorCallBack(message);
      });
  }

  async read(successCallBack?: () => void, errorCallBack?: (errorMessage: string) => void): Promise<{ totalTodoCount: number; todos: List_Todo[] }> {
    const promiseData: Promise<{ totalTodoCount: number; todos: List_Todo[] }> = this.httpClientService.get<{ totalTodoCount: number; todos: List_Todo[] }>({
      controller: "todos",
      action:"getAll"
    }).toPromise();

    try {
      const data = await promiseData;
      if (successCallBack) {
        successCallBack();
      }
      return data;
    } catch (errorResponse: any) {
      if (errorCallBack) {
        errorCallBack(errorResponse.message);
      }
      throw errorResponse;
    }
}




  async delete(id: string) {
    const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
      controller: "todos"
    }, id);

    await firstValueFrom(deleteObservable);
  }
}