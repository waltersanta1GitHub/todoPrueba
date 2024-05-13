import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../shared/models/todo';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private clienteUrl: string;

  constructor(private http: HttpClient) {
    this.clienteUrl = 'http://localhost:5145';
  }

  getTodoAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.clienteUrl + '/todoitems').pipe(
      map((res) => {
        const todoslist = [];
        todoslist.push(...res);

        console.log(todoslist);

        return todoslist;
      })
    );
  }

  insertarTodo(todo: Todo) {
    this.http
      .post<any>(this.clienteUrl + '/todoitems/insertar', todo)
      .subscribe({
        next: (data) => {
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }

  marcarHecho(todo: Todo, id: number) {
    this.http
      .put<Todo>(this.clienteUrl + '/todoitems/marcarhecho/' + id, todo)
      .subscribe({
        next: (data) => {
          console.log(data.id);
        },
        error: (error) => {
          console.error('There was an error!', error);
        },
      });
  }
}
