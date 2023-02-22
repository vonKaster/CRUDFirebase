<template>
  <div>
    <v-app-bar app fixed color="#DFE0E2" dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <img class="mt-2" :src="require('../assets/logodigicard.png')" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn color="blue" text v-if="userExists" :to="{ name: 'home' }">Inicio</v-btn>
        <v-btn color="blue" text v-if="!userExists" :to="{ name: 'login' }">Ingresar</v-btn>
        <v-btn color="blue" text v-if="!userExists" :to="{ name: 'register' }">Registro</v-btn>
        <v-btn @click="signOut()" v-if="userExists" color="red">Cerrar Sesión</v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: "navBar",
  data() {
    return {};
  },
  methods: {
    ...mapActions(['signOut'])
  },
  computed:{
    ...mapGetters(['userExists'])
  }
};
</script>
