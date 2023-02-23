<template>
  <v-container>
    <v-row>
      <v-container class="formLoginContainer">
        <h1 class="text-center">Acceso</h1>
        <br />
        <v-form @submit.prevent="signIn({ provider: 'email', credentials: { email: email, passwd: passwd } })">
          <v-text-field
            outlined
            type="email"
            placeholder="Ingrese su correo electŕonico"
            v-model="email"
            append-icon="mdi-account"
          />
          <v-text-field
            outlined
            type="password"
            placeholder="Ingrese su contraseña"
            v-model="passwd"
            append-icon="mdi-lock"
          />
          <v-btn dark color="#3f51b5" type="submit">Ingresar</v-btn>
        </v-form>
        <p class="text-center mt-4">{{ error }}</p>
        <v-divider :thickness="4"></v-divider>
        <v-container>
          <div class="mx-auto text-center">
            <v-btn @click="signIn({ provider: 'google'})" x-large icon color="#3f51b5"
              ><v-icon>mdi-google</v-icon></v-btn
            >
            <v-btn @click="signIn({ provider: 'github'})" x-large icon color="#3f51b5"
              ><v-icon>mdi-github</v-icon></v-btn
            >
            <v-btn @click="signIn({ provider: 'facebook'})" x-large icon color="#3f51b5"
              ><v-icon>mdi-facebook</v-icon></v-btn
            >
          </div>
        </v-container>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Login",

  data() {
    return {
      email: "",
      passwd: ""
    };
  },

  created() {
    const style = document.createElement("style");
    style.setAttribute("id", "custom-main-style");
    style.textContent = `
      main {
        background-image: url(https://raw.githubusercontent.com/vonKaster/CRUDFirebase/5d71b7551b98a6451962773ab466acb9ddd83bd1/src/assets/wave.svg)!important;
        background-position: bottom center;
      }
    `;
    document.head.appendChild(style);
  },

  beforeDestroy() {
    const style = document.getElementById("custom-main-style");
    if (style) {
      document.head.removeChild(style);
    }
  },

  computed: {
    ...mapState(["error"]),
  },

  methods: {
    ...mapActions(["signIn"]),
  },
};
</script>
