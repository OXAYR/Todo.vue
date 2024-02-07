// todoStore.js

import { defineStore } from 'pinia';
import axios from "axios";
export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
    }),
    getters: {
        getTodos(state) {
            return state.todos;
        },
    },
    actions: {
        // Implement actions for CRUD operations (create, read, update, delete)
        async addTodo(newTodo) {
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.post('/api/item', newTodo, {
                headers: {
                    Authorization: `Bearer ${userToken}`, // Attach the bearer token
                },
            });
            console.log("response--------->", response)
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
