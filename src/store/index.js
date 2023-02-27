import Vue from "vue";
import Vuex from "vuex";
import {
  db,
  auth,
  user,
  GoogleAuthProvider,
  FacebookAuthProvider,
  GithubAuthProvider,
} from "../firebase";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    task: { name: "", id: "" },
    snackBarAlerts: [],
    user: null,
    error: null,
    loader: false,
    searchText: ""
  },
  getters: {},
  mutations: {
    setTasks(state, payload) {
      state.tasks = payload;
    },
    setTask(state, payload) {
      state.task = payload;
    },
    setDeleteTask(state, payload) {
      state.tasks = state.tasks.filter((task) => task.id !== payload);
    },
    setSnackBarAlert(state, payload) {
      state.snackBarAlerts.push(payload);
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    setLoader(state, payload) {
      state.loader = payload;
    }
  },
  actions: {
    getTasks({ commit, state }) {
      commit('setLoader', true);
      const tasks = [];
      db.collection(state.user.email)
        .get()
        .then((res) => {
          res.forEach((doc) => {
            let task = doc.data();
            task.id = doc.id;
            tasks.push(task);
          });
          setTimeout(() => {
            commit('setLoader', false);
          }, 1000)
          commit("setTasks", tasks);
        });
    },
    getTask({ commit, state }, id) {
      db.collection(state.user.email)
        .doc(id)
        .get()
        .then((doc) => {
          let task = doc.data();
          task.id = doc.id;
          commit("setTask", task);
        });
    },
    editTask({ commit, state }, task) {
      commit('setLoader', true);
      db.collection(state.user.email)
        .doc(task.id)
        .update({
          name: task.name,
        })
        .then(() => {
          router.push("/");
          commit("setSnackBarAlert", {
            message: `Tarea editada con éxito`,
            color: "green",
            timeout: 5000,
          });
          setTimeout(() => {
            commit('setLoader', false);
          }, 1000)
        });
    },
    addTask({ commit, state }, taskName) {
      commit('setLoader', true);
      db.collection(state.user.email)
        .add({
          name: taskName,
        })
        .then((doc) => {
          router.push("/");
          commit("setSnackBarAlert", {
            message: `Tarea agregada con éxito`,
            color: "green",
            timeout: 5000,
          });
          setTimeout(() => {
            commit('setLoader', false);
          }, 1000)
        });
    },
    deleteTask({ commit, state }, id) {
      db.collection(state.user.email)
        .doc(id)
        .delete()
        .then(() => {
          commit("setDeleteTask", id);
          commit("setSnackBarAlert", {
            message: `Tarea eliminada con éxito`,
            color: "green",
            timeout: 5000,
          });
        });
    },
    searchTasks({commit, state}, payload) {
      state.searchText = payload.toLowerCase();
    },
    createUser({ commit }, credentials) {
      auth
        .createUserWithEmailAndPassword(credentials.email, credentials.passwd)
        .then((res) => {
          console.log(res);
          auth.currentUser.updateProfile({
            displayName: credentials.name,
            photoURL: 'https://raw.githubusercontent.com/vonKaster/CRUDFirebase/204e35cdc01abf6dd34869facb8badcde772b7a7/src/assets/user.jpg'
          })
          const createdUser = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid,
            photosrc: res.photoURL
          };
          db.collection(res.user.email).add({
              name: "Tarea de ejemplo",
            })
            
            .then((dic) => {
              commit("setUser", createdUser);
              router.push("/");
              location.reload();
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => {
          console.log(err);
          commit("setError", err.code);
        });
    },
    signIn({ commit }, { provider, credentials }) {
      let authPromise = null;
      if (provider === "email") {
        authPromise = auth.signInWithEmailAndPassword(
          credentials.email,
          credentials.passwd
        );
      } else if (provider === "google") {
        const provider = new GoogleAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === "facebook") {
        const provider = new FacebookAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else if (provider === "github") {
        const provider = new GithubAuthProvider();
        authPromise = auth.signInWithPopup(provider);
      } else {
        console.error("Invalid provider");
        return;
      }

      authPromise
        .then((res) => {
          console.log(res);
          const userLoggedIn = {
            email: res.user.email,
            uid: res.additionalUserInfo.uid,
          };
          commit("setUser", userLoggedIn);
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          commit("setError", err.code);
        });
    },

    signOut({ commit }) {
      auth.signOut().then(() => {
        router.push("/login");
      });
    },
    detectUser({ commit }, user) {
      commit("setUser", user);
    },
    changeUserName({ commit }, name){
      if (name.length >= 3) {
        auth.currentUser.updateProfile({
          displayName: name
        }).then(() => {
        }).catch((error) => {
          console.log(error)
        });
      } else {
        
      }
    },
    changePassword ({ commit }, newPassword) {
      auth.currentUser.updatePassword(newPassword).then(function() {
      }).catch(function(error) {
        console.log(error);
        commit("setError", error.code);
      });
    }

  },

  getters: {
    userExists(state) {
      if (state.user === null) {
        return false;
      } else {
        return true;
      }
    },
    tasksFiltered(state){
      let tasks = [];
      for(let task of state.tasks) {
        if (task && task.name) {
          let name = task.name.toLowerCase();
          if(name.indexOf(state.searchText) >= 0) {
            tasks.push(task);
          }
        }
      }
      return tasks;
    }   
  },
  modules: {},
});
