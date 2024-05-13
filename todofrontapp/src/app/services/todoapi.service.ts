import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from '../shared/models/todo';
import { BehaviorSubject, Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TodoApiService {
  private clienteUrl: string;

  todos: Todo[] = [];
  

  constructor(private http: HttpClient) {
    this.clienteUrl = 'http://localhost:5145';
  }

  getTodoAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.clienteUrl + '/todoitems').pipe(
      map((res) => {
        const todoslist = [];
        todoslist.push(...res);
        return todoslist;
      })
    );
  }

  insertarTodo(todo: any): Observable<any>  {
   return this.http
      .post<any>(this.clienteUrl + '/todoitems/insertar', todo);
  }

  marcarHecho(todo: Todo, id: number): Observable<any> {
    return this.http
      .put<Todo>(this.clienteUrl + '/todoitems/marcarhecho/' + id, todo);
  }
}
