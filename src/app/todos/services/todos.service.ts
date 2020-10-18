import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { ITodo } from '../interfaces';
import { ITodosState } from '../state/todos.reducer';
import { FILTER_MODES } from '../constants/filter-modes';
import * as TodoActions from '../state/todo.actions';
import * as todoSelectors from '../state/todo.selectors';

@Injectable()
export class TodosService {

  allTodos$: Observable<ITodo[]>;
  filter: Observable<ITodosState>;

  constructor(
    private store: Store<ITodosState>,
  ) {
    this.allTodos$ = this.store.select(todoSelectors.allTodos)
    this.filter =  this.store.select(todoSelectors.todosSelector);
  }

  addTodo(text: string): void {
    this.store.dispatch(TodoActions.addTodo({ text }));
  }

  removeTodo(id: number): void {
    this.store.dispatch(TodoActions.removeTodo({ id }));
  }

  toggleComplete(id: number): void {
    this.store.dispatch(TodoActions.toggleCompleted({ id }));
  }

  toggleAllCompleted(): void {
    this.store.dispatch(TodoActions.toggleAllCompleted());
  }

  updateTodo(id: number, text: string): void {
    this.store.dispatch(TodoActions.updateTodo({ id, text }));
  }

  changeFilterMode(mode: FILTER_MODES): void {
    this.store.dispatch(TodoActions.changeFilterMode({ mode }));
  }

  clearCompleted(): void {
    this.store.dispatch(TodoActions.clearCompleted());
  }

  editTodo(id: number): void {
    this.store.dispatch(TodoActions.editTodo({id}));
  }
}
