import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import AddTodoView from '../views/AddTodoView.vue'

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

  ]
})

export default router
