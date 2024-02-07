// todoStore.js

import { defineStore } from 'pinia';

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [], // Initialize an empty array for storing ToDo items
    }),
    getters: {
        getTodos(state) {
            return state.todos;
        },
    },
    actions: {
        // Implement actions for CRUD operations (create, read, update, delete)
        addTodo(newTodo) {
            this.todos.push(newTodo);
        },
        updateTodo(updatedTodo) {
            // Implement logic to update a specific ToDo item
            // ...
        },
        deleteTodo(todoId) {
            // Implement logic to delete a specific ToDo item
            // ...
        },
    },
});
