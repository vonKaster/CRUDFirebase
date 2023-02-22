<template>
  <v-container>
    <v-row>
      <v-container class="formLoginContainer">
        <h1 class="text-center">Acceso</h1>
        <br />
        <v-form @submit.prevent="signIn({ email: email, passwd: passwd })">
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
      passwd: "",
    };
  },

  mounted() {},

  computed: {
    ...mapState(["error"]),
  },

  methods: {
    ...mapActions(["signIn"]),
  },
};
</script>
