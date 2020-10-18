import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from './todo.actions';

import { FILTER_MODES } from './../constants/filter-modes';
import { ITodo } from '../interfaces/ITodo';

export interface ITodosState {
  filterMode?: FILTER_MODES;
  todos?: ITodo[];
}

export const initialState: ITodosState = {
  filterMode: 'All',
  todos: [],
};

export function todosReducer(state: ITodosState, action: Action) {
  return createReducer(
    initialState,
    on(TodoActions.addTodo, (existingState, { text }) => {
      return({
        ...existingState,
        todos: [{ text, completed: false, 
          id: existingState.todos.length ? Math.max.apply(Math, existingState.todos.map(todo => todo.id)) +1 : 0,
          editing: false
        }, ...existingState.todos],
      })
    }),
    on(TodoActions.removeTodo, (existingState, { id }) => {
      const updatedTodos = [...existingState.todos];
      let index = updatedTodos.findIndex(todo => todo.id === id)
      updatedTodos.splice(index, 1);

      return {
        ...existingState,
        todos: updatedTodos,
      };
    }),
    on(TodoActions.editTodo, (existingState, {id}) =>{
      let updatedTodos = [...existingState.todos];
      const index = updatedTodos.findIndex(todo => id === todo.id);
      let editing = updatedTodos.filter(todo => todo.editing === true)
      if(editing.length > 0){
        updatedTodos = updatedTodos.map((todo, todoindex) => {
          if(todoindex != index) {return{...todo, editing : false}}else{return{...todo}}});
      }
     updatedTodos = updatedTodos.map((currElement, currIndex) => {
       if(currIndex === index){
         return {...currElement, editing: !currElement.editing}
       }else {
         return currElement
       }
      });
     return {
       ...existingState,
       todos: updatedTodos,
     }; 
   }),
    on(TodoActions.changeFilterMode, (existingState, { mode }) =>{
      return ({
      ...existingState,
      filterMode: mode,
    })}),
    on(TodoActions.clearCompleted, (existingState) => ({
      ...existingState,
      todos: [...existingState.todos.filter(todo => !todo.completed)],
    })),
    on(TodoActions.toggleCompleted, (existingState, { id }) => {
       let updatedTodos = [...existingState.todos];
       const index = updatedTodos.findIndex(todo => id === todo.id);
      updatedTodos = updatedTodos.map((currElement, currIndex) => {
        if(currIndex === index){
          return {...currElement, completed: !currElement.completed}
        }else {
          return currElement
        }
       });
      return {
        ...existingState,
        todos: updatedTodos,
      }; 
    }),on(TodoActions.toggleAllCompleted, (existingState) => {
      let updatedTodos = [...existingState.todos];
      let checked = 0;
      for(let i = 0; i < updatedTodos.length; i++){
        if(updatedTodos[i].completed === true){checked++};
      }
      if(checked < updatedTodos.length){
        updatedTodos = updatedTodos.map((currElement) => {
          return {...currElement, completed: true}
       });
      }else{
        updatedTodos = updatedTodos.map((currElement) => {
          return {...currElement, completed: false}
       });
      }
      
      return {
        ...existingState,
        todos: updatedTodos,
    }}),on(TodoActions.updateTodo, (existingState, { id, text }) => {
      let updatedTodos = [...existingState.todos];
      const index = updatedTodos.findIndex(todo => id === todo.id);
     updatedTodos = updatedTodos.map((currElement, currIndex) => {
       if(currIndex === index){
         return {...currElement, text: text}
       }else {
         return currElement
       }
      });
     return {
       ...existingState,
       todos: updatedTodos,
     }; 
   }),
  )(state, action);
}

export const filterMode = (state: ITodosState) => state.filterMode;
export const todos = (state: ITodosState) => state.todos;
