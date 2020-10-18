import { Component, ElementRef, Input, ViewChild, ViewChildren } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ITodo } from '@app/todos/interfaces/ITodo';
import { TodosService } from '@app/todos/services/todos.service';
import { ITodosState } from '@app/todos/state/todos.reducer';

@Component({
  selector: 'app-todos-list',
  styleUrls: [
    './todo-list.component.scss',
  ],
  templateUrl: './todo-list.component.html',
})
export class TodosListComponent {
  allTodos:ITodo[] = [];
  filter: ITodosState;
  editTodoForm: FormGroup;
  textToEdit: string;

  constructor(public todoService: TodosService){
  this.todoService.filter.subscribe(fiterMode => {
    this.allTodos = fiterMode.todos.filter((todo)=>{
      if(fiterMode.filterMode === 'Active'){
        return todo.completed == false
      }else if(fiterMode.filterMode === 'Completed'){
        return todo.completed == true
      }else{return todo}
    })
  });

}


destroyTodo(id: number){
    this.todoService.removeTodo(id);
 }

 checkTodo(id: number){
   this.todoService.toggleComplete(id);
 }

 complete(id: number): boolean {
   const index = this.allTodos.findIndex(todo => id === todo.id);
   return this.allTodos[index].completed;
 }
 marktoEdit(id: number):boolean {
  const index = this.allTodos.findIndex(todo => id === todo.id);
  if(index>=0){
    return this.allTodos[index].editing;
  }else {return false}
 
 }

 toEdit(id: number, todoText:string){
  this.todoService.editTodo(id)
  this.editTodoForm =  new FormGroup({
    'todoText': new FormControl(todoText,[Validators.required])
  })
}

 onSubmit(id: number){
  if(this.editTodoForm.valid){
  this.todoService.updateTodo(id, this.editTodoForm.value.todoText)
  this.todoService.editTodo(id);
  }
}
  
}
