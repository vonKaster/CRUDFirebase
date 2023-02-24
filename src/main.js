import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueMeta from "vue-meta";
import { auth } from "./firebase";
import Vuelidate from 'vuelidate'

Vue.use(VueMeta);
Vue.use(Vuelidate);
Vue.config.productionTip = false;

auth.onAuthStateChanged((user) => {
  if (user) {
    console.log(user);
    const detectedUser = {
      name: user.displayName,
      email: user.email,
      uid: user.uid,
      photosrc: user.photoURL
    };
    store.dispatch("detectUser", detectedUser);
  } else {
    store.dispatch("detectUser", user);
  }

  new Vue({
    router,
    store,
    vuetify,
    render: (h) => h(App),
  }).$mount("#app");
});
