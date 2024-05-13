import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { Priority, Todo } from './shared/models/todo';
import { TodoApiService } from './services/todoapi.service';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';

import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, EMPTY, catchError } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ButtonModule,
    CheckboxModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    CardModule,
    DataViewModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ADICIONAR TAREA';
  priorities: Priority[] = [
    { id: 1, name: 'Urgente' },
    { id: 2, name: 'Media' },
    { id: 3, name: 'Sin Prioridad' },
  ];
  status: boolean = false;
  selectedPriority: string = '';
  todos: Todo[] = [];
  form: FormGroup;
  recordId: number = 1;
  todosbeha:BehaviorSubject<Todo[]>;

  /**
   *
   */
  constructor(private todoApiService: TodoApiService) {

    this.todosbeha = new BehaviorSubject<Todo[]>(this.todos); 

    this.form = new FormGroup({
      ctrlPriority: new FormControl<number | null>(null),
      ctrlStatus: new FormControl<boolean>(false),
      ctrlName: new FormControl<string | null>(null),
    });
  }

  ngOnInit() {
    this.listarTodos();
  }

  adicionar(form: any) {
    const todo: any = {
      id: this.recordId,
      name: form.value.ctrlName,
      isDone: JSON.parse(form.value.ctrlStatus[0]),
      priority:form.value.ctrlPriority.id,
    };
    this.todoApiService.insertarTodo(todo);
    
    
    this.recordId++;
  }

  listarTodos() {
    this.todoApiService
      .getTodoAll()
      .pipe(catchError(() => EMPTY))
      .subscribe({
        next: (todos) => {
          this.todos = todos;
          this.todosbeha.next(todos);
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  getPriority(id:number){
    const prioridad = this.priorities.find( x => x.id === id);
    return prioridad;
  }


  clear(){
    this.todos=[];
  }

}
