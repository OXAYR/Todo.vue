
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
        async addTodo(newTodo) {
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.post('/api/item', newTodo, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log("response--------->", response)
            this.todos.push(newTodo);
        },
        async updateTodo(updatedTodo) {
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.put('/api/item', newTodo, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
        },
        async deleteTodo(todoId) {
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.delete('/api/item', newTodo, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
        },
        async fetchTodos() {
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.get('/api/item', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log("response----------> ", response);
        }
    },
});
