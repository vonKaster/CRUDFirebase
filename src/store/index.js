import Vue from 'vue'
import Vuex from 'vuex'
import { db, auth, GoogleAuthProvider, FacebookAuthProvider, GithubAuthProvider } from '../firebase'
import router from '../router'

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
    getTasks({commit, state}){
      const tasks = []
      db.collection(state.user.email).get()
      .then(res => {
        res.forEach(doc => { 
          let task = doc.data()
          task.id = doc.id
          tasks.push(task)
        })
        commit('setTasks', tasks)
      })
    },
    getTask({commit, state}, id) {
      db.collection(state.user.email).doc(id).get()
      .then(doc => {
        let task = doc.data()
        task.id = doc.id
        commit('setTask', task)
      })
    },
    editTask({commit, state}, task) {
      db.collection(state.user.email).doc(task.id).update({
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
    addTask({commit, state}, taskName) {
      db.collection(state.user.email).add({
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
    deleteTask({commit, state}, id) {
      db.collection(state.user.email).doc(id).delete()
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

        db.collection(res.user.email).add({
          name: 'tarea de ejemplo'
        }).then(dic => {
          commit('setUser', createdUser)
          router.push('/')
        })
        .catch(err => console.log(err))
      })
      .catch(err => {
        console.log(err);
        commit('setError', err)
      })
    },
    signIn({ commit }, { provider, credentials }) {
      console.log(credentials);
      let authPromise = null;
      if (provider === 'email') {
        authPromise = auth.signInWithEmailAndPassword(credentials.email, credentials.passwd);
      } else if (provider === 'google') {
        const provider = new GoogleAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === 'facebook') {
        const provider = new FacebookAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === 'github') {
        const provider = new GithubAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else {
        console.error('Invalid provider');
        return;
      }
    
      authPromise
        .then(res => {
          console.log(res)
          const userLoggedIn = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid
          }
          commit('setUser', userLoggedIn )
          router.push('/')
        })
        .catch(err => {
          console.log(err);
          commit('setError', err);
        })
    },
    
    
    signOut({commit}) {
      auth.signOut()
      .then(() => {
        router.push('/login')
      })
    },
    detectUser({commit}, user) {
      commit('setUser', user);
    },
  },

  getters: {
    userExists(state){
      if(state.user === null) {
        return false
      } else {
        return true
      }
    }
  },
  modules: {
  },
  
})
