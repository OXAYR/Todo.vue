import { createRouter, createWebHistory } from 'vue-router';
import WelcomeView from '../views/GuestView/WelcomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignUpView from '../views/SignUpView.vue';
import HomeView from '../views/UserView/HomeView.vue';
import TodosView from '../views/UserView/TodosView.vue';
import AddTodoView from '../views/UserView/AddTodoView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'todos',
          component: TodosView
        },
        {
          path: 'add',
          name: 'add-todo',
          component: AddTodoView
        },
        {
          path: 'todo/edit/:id',
          name: 'edit-todo',
          component: AddTodoView
        }
      ]
    },
    {
      path: '/',
      name: 'welcome',
      component: WelcomeView,
      meta: { requiresGuest: true }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { requiresGuest: true }
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView,
      meta: { requiresGuest: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("userAuth");

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'welcome' });
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'home' });
  } else {
    next();
  }
});

export default router;
