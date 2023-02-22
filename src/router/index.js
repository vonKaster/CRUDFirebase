import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import editTaskView from '../views/editTaskView.vue'
import addTaskView from '../views/addTaskView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import { auth } from '../firebase'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/editTask/:id',
    name: 'editTask',
    component: editTaskView
  },
  {
    path: '/addTask',
    name: 'addTask',
    component: addTaskView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    const user = auth.currentUser

    if(!user) {
      next({path: '/login'})
    } else {
      next()
    }

  } else {
    next()
  }
})

export default router
