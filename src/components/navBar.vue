<template>
  <div>
    <v-app-bar class="marginBottom" app fixed color="white" dark>
      <v-toolbar-title>
        <router-link :to="{ name: 'home' }">
          <img class="mt-2" :src="require('../assets/logodigicard.png')" />
        </router-link>
      </v-toolbar-title>
      <v-spacer />
      <v-toolbar-items>
        <v-btn color="indigo" text v-if="userExists" :to="{ name: 'home' }"><v-icon class="mr-1">mdi-home</v-icon>Inicio</v-btn>
        <v-btn color="indigo" text v-if="!userExists" :to="{ name: 'login' }"><v-icon class="mr-1">mdi-login</v-icon>Ingresar</v-btn>
        <v-btn color="indigo" text v-if="!userExists" :to="{ name: 'register' }"><v-icon class="mr-1">mdi-account-plus</v-icon>Registro</v-btn>
        <v-btn @click="signOut()" text v-if="userExists" color="red"><v-icon class="mr-1">mdi-logout</v-icon>cerrar sesión</v-btn>
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