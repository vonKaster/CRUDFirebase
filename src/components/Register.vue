<template>
  <v-container>
    <v-row>
      <v-container class="formLoginContainer">
        <h1 class="text-center">Registro</h1>
        <br />
        <v-form @submit.prevent="createUser({ email: email, passwd: passwd })">
          <v-text-field
            append-icon="mdi-account"
            outlined
            type="email"
            placeholder="Ingrese su correo electŕonico"
            v-model="email"
          />
          <v-text-field
            append-icon="mdi-lock"
            outlined
            type="password"
            placeholder="Ingrese su contraseña"
            v-model="passwd"
          />
          <v-text-field
            append-icon="mdi-lock-check"
            outlined
            type="password"
            placeholder="Repita su contraseña"
            v-model="passwdConfirm"
          />
          <v-btn :disabled="!validatePasswd" color="success" type="submit"
            >Enviar</v-btn
          >
        </v-form>
        <p>{{ error }}</p>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Register",

  data() {
    return {
      email: "",
      passwd: "",
      passwdConfirm: "",
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

  methods: {
    ...mapActions(["createUser"]),
  },

  computed: {
    ...mapState(["error"]),

    validatePasswd() {
      return (
        this.passwd === this.passwdConfirm &&
        this.passwd.trim() !== "" &&
        this.passwd.length > 5
      );
    },
  },
};
</script>
