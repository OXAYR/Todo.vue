
import { defineStore } from 'pinia';
import axios from "axios";
export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
    }),
    getters: {
        getTodos(state) {
            console.log("these are the todos----------->", state.todos)
            return state.todos;
        }
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
            console.log("Todoid------------>", todoId)
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.delete(`/api/item/${todoId}`, {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            const deletedIndex = this.todos.findIndex((todo) => todo.id === todoId);
            const deletedTodo = this.todos[deletedIndex];
            console.log("deleted todo --------->", deletedTodo);
            this.todos.splice(deletedIndex, 1);
        },
        async fetchTodos() {
            const userToken = localStorage.getItem("userAuth");
            const response = await axios.get('/api/items', {
                headers: {
                    Authorization: `Bearer ${userToken}`,
                },
            });
            console.log("response----------> ", response.data.items.data);
            this.todos = response.data.items.data;
        }
    },
});
