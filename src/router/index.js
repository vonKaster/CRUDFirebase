import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import editTaskView from '../views/editTaskView.vue'
import addTaskView from '../views/addTaskView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
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
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
