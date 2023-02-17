<template>
  <v-app>
    <navBar/>
    <v-main>
      <router-view/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import navBar from './components/navBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    navBar,
    Footer
  },

  data: () => ({
    //
  }),
};
</script>
