import { defineStore } from 'pinia';
import axios from "axios";
export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [],
        selectedTodo: [],
        loading: false,
        currentPage: 0,
        lastPage: 0,
    }),
    getters: {
        getTodos({ todos }) {
            console.log("these are the todos----------->", todos)
            return todos;
        },
        getSelectedTodo({ selectedTodo }) {
            console.log("Selected todo in the getters ", selectedTodo)
            return selectedTodo;
        },
        isLoading({ loading }) {
            return loading;
        },
        getCurretPage({ currentPage }) {
            console.log("curent page from the getter ", currentPage)
            return currentPage;
        },

        getLastPage({ LastPage }) {
            return LastPage;
        }
    },
    actions: {
        async addTodo(newTodo) {
            this.loading = true;
            try {
                const userToken = localStorage.getItem("userAuth");
                const response = await axios.post('/api/item', newTodo, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                console.log("response--------->", response);
                this.todos.push(newTodo);
            } catch (error) {
                console.error("Error adding todo:", error);

            } finally {
                this.loading = false;
            }
        },
        async fetchTodos(pageNumber) {
            this.loading = true;
            try {
                console.log("pageNumber---------->", pageNumber);
                const userToken = localStorage.getItem("userAuth");
                const response = await axios.get(`/api/items?page=${pageNumber}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                console.log("response----------> ", response.data);

                if (pageNumber === 1) {
                    this.todos = response.data.items.data;
                } else {
                    this.todos = [...this.todos, ...response.data.items.data];
                }

                this.currentPage = response.data.items.current_page;
                console.log("in the req", this.currentPage);

                this.lastPage = response.data.items.last_page;
                console.log("in the req", this.lastPage);
            } catch (error) {
                console.error("Error fetching todos:", error);
            } finally {
                this.loading = false;
            }
        },

        async deleteTodo(todoId) {
            this.loading = true;
            try {
                console.log("Todoid------------>", todoId);
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
            } catch (error) {
                console.error("Error deleting todo:", error);
            } finally {
                this.loading = false;
            }
        },
        async updateTodo(updatedTodo, todoId) {
            this.loading = true;
            try {
                console.log("updated todo ", updatedTodo, " id ", todoId);
                const userToken = localStorage.getItem("userAuth");
                const response = await axios.put(`/api/item/${todoId}`, updatedTodo, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
            } catch (error) {
                console.error("Error updating todo:", error);
            } finally {
                this.loading = false;
            }
        },
        async fetchTodoById(todoId) {
            this.loading = true;
            try {
                const userToken = localStorage.getItem("userAuth");
                const response = await axios.get(`/api/item/${todoId}`, {
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                    },
                });
                console.log("response----------> ", response.data.item);
                this.selectedTodo = response.data.item;
            } catch (error) {
                console.error("Error fetching todo by ID:", error);
            } finally {
                this.loading = false;
            }
        },
    },
});
