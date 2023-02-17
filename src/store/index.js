import Vue from 'vue'
import Vuex from 'vuex'
import { db } from '../firebase'
import router from '../router'
import { auth } from '../firebase'

Vue.use(Vuex)

export default new Vuex.Store({
  state: { 
    tasks: [],
    task: {name: '', id: ''},
    snackBarAlerts: [],
    user: null,
    error: null
  },
  getters: {
  },
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
    setTask(state, payload) {
      state.task = payload;
    },
    setDeleteTask(state, payload) {
      state.tasks = state.tasks.filter(task => task.id !== payload)
    },
    setSnackBarAlert(state, payload) {
      console.log(payload);
      state.snackBarAlerts.push(payload);
      console.log(state.snackBarAlerts);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    }
  },
  actions: {
    getTasks({commit}){
      const tasks = []
      db.collection('tasks').get()
      .then(res => {
        res.forEach(doc => { 
          let task = doc.data()
          task.id = doc.id
          tasks.push(task)
        })
        commit('setTasks', tasks)
      })
    },
    getTask({commit}, id) {
      db.collection('tasks').doc(id).get()
      .then(doc => {
        let task = doc.data()
        task.id = doc.id
        commit('setTask', task)
      })
    },
    editTask({commit}, task) {
      db.collection('tasks').doc(task.id).update({
        name: task.name
      })
      .then(() => {
        router.push('/');
        commit('setSnackBarAlert', {
          message: `Tarea editada con éxito`,
          color: "green",
          timeout: 5000,
        });
      })
    },
    addTask({commit}, taskName) {
      db.collection('tasks').add({
        name: taskName
      })
      .then (doc => {
        router.push('/');
        commit('setSnackBarAlert', {
          message: `Tarea agregada con éxito`,
          color: "green",
          timeout: 5000,
        });
      })
    },
    deleteTask({commit}, id) {
      db.collection('tasks').doc(id).delete()
      .then(() => {
        commit('setDeleteTask', id);
        console.log(this.snackBarAlerts);
        commit('setSnackBarAlert', {
          message: `Tarea eliminada con éxito`,
          color: "green",
          timeout: 5000,
        });
      })
    },
    createUser({commit}, credentials) {
      auth.createUserWithEmailAndPassword(credentials.email, credentials.passwd)
      .then(res => {
        console.log(res);
        const createdUser = {
          email: res.user.email,
          uid: res.additionalUserInfo.uid
        }
        commit('setUser', createdUser)
        router.push('/')
      })
      .catch(error => {
        console.log(error);
        commit('setError', error)
      })
    }
  },
  modules: {
  },
  
})
