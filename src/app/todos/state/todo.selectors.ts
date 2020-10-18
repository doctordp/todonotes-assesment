import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITodo } from '../interfaces';
import * as todosState from './todos.reducer';

export const todosSelector = createFeatureSelector<todosState.ITodosState>('todos');

 export const allTodos = createSelector(
  todosSelector,
  todosState.todos
);
 
