import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import AddTodoView from '../views/AddTodoView.vue'
import TodoView from "../views/TodosView.vue"
import HomeView from "../views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpView
    },
    {
      path: "/home",
      component: HomeView,
      meta: {
        requiresAuth: true,
        userAuth: true,
      },
      children: [

        {
          path: "",
          component: TodoView,
        },
        {
          path: '/addtodo',
          component: AddTodoView
        },
        {
          path: '/todo/edit/:id',
          name: 'todo',
          component: AddTodoView
        },
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    const authUser = localStorage.getItem("userAuth");
    console.log("auth user----------->", authUser);
    if (!authUser) {
      console.log("No authentication token found or invalid token:", authUser);
      next({ name: "login" });
    } else {
      console.log("Authentication token verified:", authUser);
      next();
    }

  } else {
    next();
  }
});

export default router
