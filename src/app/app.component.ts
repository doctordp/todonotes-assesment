import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FILTER_MODES } from './todos/constants/filter-modes';
import { ITodo } from './todos/interfaces';
import { TodosService } from './todos/services/todos.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit{
  todoForm: FormGroup;
  allTodos: ITodo[] = [];
  toEdit = false;

  constructor(public todoService: TodosService){}

  ngOnInit(){
    this.todoForm = new FormGroup({
      'todoText': new FormControl(null, [Validators.required])
    })

  }
  onSubmit(){
    if(this.todoForm.valid){
      this.todoService.addTodo(this.todoForm.value.todoText);
      this.todoForm.reset();
    }
 
  }
  showByFilter(mode: FILTER_MODES){
    this.todoService.changeFilterMode(mode);
  }

  clearCompleted(){
    this.todoService.clearCompleted();
  }
}
