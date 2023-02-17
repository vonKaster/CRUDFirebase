<template>
  <div>
    <v-app-bar app fixed color="#DFE0E2" dark>
      <v-spacer />
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <img class="mt-2" :src="require('../assets/logodigicard.png')" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
  </div>
</template>

<script>
export default {
  name: "navBar",
  data() {
    return {};
  },
};
</script>
