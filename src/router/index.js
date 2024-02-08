import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AddTodoView from '../views/AddTodoView.vue'
import TodoView from "../views/TodosView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: LoginView
    },
    {
      path: '/todo/edit/:id',
      name: 'todo',
      component: AddTodoView
    },
    {
      path: '/addtodo',
      component: AddTodoView
    },
    {
      path: "/todos",
      component: TodoView,
    }

  ]
})

export default router
