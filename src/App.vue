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
main {
  padding: 96px 96px 10px 96px !important;
  background-image: url(./assets/wave.svg) !important;
  background-position: bottom center;
  background-color: #fbfbfb;
}

.formLoginContainer {
  width: 500px;
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
</style>
