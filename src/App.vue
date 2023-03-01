<template>
  <v-app>
    <navBar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script>
import navBar from "./components/navBar.vue";
import Footer from "./components/Footer.vue";

export default {
  name: "App",
  components: {
    navBar,
    Footer,
  },

  data: () => ({
    //
  }),
};
</script>

<style>
@media (min-width: 768px) {
  main {
    padding: 96px 96px 10px 96px!important;
  }
}

.formLoginContainer {
  width: 500px!important;
  height: 305px;
  border-radius: 5px;
}
.formLoginContainer button {
  width: 100%;
}
.formLoginContainer h1, h2 {
  font-weight: 400;
}
.tasksTable{
  border: 2px solid white;
  border-radius: 10px;
}
.editTaskContainer {
  width: 500px;
  border-radius: 5px;
}
.editTaskContainer button {
  width: 100%;
}

.v-messages__message {
  color: #3f51b5;
  font-size: 0.75rem !important;
  font-weight: 500!important;
  line-height: 2rem!important;
  letter-spacing: 0.1666666667em !important;
  font-family: "Roboto", sans-serif !important;
  text-transform: uppercase !important;
}

.v-input__icon ::before {
  color: #3f51b5 !important;
}

@media (max-width: 600px) {
  .editTaskContainer {
    width: 90%!important;
  }
}

</style>
