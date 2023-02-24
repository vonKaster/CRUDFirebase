<template>
  <v-container>
    <v-row>
      <v-container class="formLoginContainer">
        <h1 class="text-center">Registro</h1>
        <br />
        <v-form
          @submit.prevent="
            createUser({ email: $v.email.$model, passwd: $v.passwd.$model })
          "
        >
          <v-text-field
            color="indigo"
            append-icon="mdi-account"
            outlined
            type="email"
            placeholder="Ingrese su correo electŕonico"
            v-model="$v.email.$model"
          />
          <v-text-field
            color="indigo"
            append-icon="mdi-lock"
            outlined
            type="password"
            placeholder="Ingrese su contraseña"
            v-model="$v.passwd.$model"
          />
          <v-text-field
            color="indigo"
            append-icon="mdi-lock-check"
            outlined
            type="password"
            placeholder="Repita su contraseña"
            v-model="passwdConfirm"
          />
          <div id="eMailErrors">
            <small
              v-if="!$v.email.required"
              class="text-overline"
              style="color: #3f51b5"
              >email Requerido *</small
            >
            <small
              v-if="!$v.email.email"
              class="text-overline"
              style="color: #3f51b5"
              >Email no válido *</small
            >
          </div>

          <div id="passwdErrors">
            <small
              v-if="!$v.passwd.required"
              class="text-overline"
              style="color: #3f51b5"
              >Contraseña requerida *</small
            >
            <small
              v-if="!$v.passwd.minLength"
              class="text-overline"
              style="color: #3f51b5"
              >debe contener al menos 6 caracteres*</small
            >
          </div>

          <div id="passwdConfirmErrors">
            <small
              v-if="!$v.passwdConfirm.sameAs"
              class="text-overline"
              style="color: #3f51b5"
              >Las contraseñas no coinciden</small
            >
          </div>

          <v-btn color="indigo" style="color: #ffffff" type="submit"
            >Registrarse</v-btn
          >
          <p
            v-if="error === 'auth/email-already-in-use'"
            style="color: #ff5252"
            class="text-center mt-4 text-overline"
          >
            Ese email ya se encuentra asociado a una cuenta
          </p>
        </v-form>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
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
    document.title = "CRUD | Registro";
    const style = document.createElement("style");
    style.setAttribute("id", "custom-main-style");
    style.textContent = `
    main {
        background-image: url(https://raw.githubusercontent.com/vonKaster/CRUDFirebase/5d71b7551b98a6451962773ab466acb9ddd83bd1/src/assets/wave.svg)!important;
        background-position: bottom center;
      }
      @media (max-width: 600px) {
        main {
          padding-top: 168px!important;
        }
      }
    `;
    document.head.appendChild(style);
  },

  mounted() {
    const emailInputDetails = document.querySelector(".v-messages__wrapper");
    const passwdInputDetails = document.querySelectorAll(
      ".v-messages__wrapper"
    )[1];
    const passwdConfirmInputDetails = document.querySelectorAll(
      ".v-messages__wrapper"
    )[2];
    if (emailInputDetails && passwdInputDetails && passwdConfirmInputDetails) {
      const eMailErrors = document.getElementById("eMailErrors");
      const passwdErrors = document.getElementById("passwdErrors");
      const passwdConfirmErrors = document.getElementById(
        "passwdConfirmErrors"
      );
      emailInputDetails.replaceWith(eMailErrors);
      passwdInputDetails.replaceWith(passwdErrors);
      passwdConfirmInputDetails.replaceWith(passwdConfirmErrors);
    }
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
  },

  validations: {
    email: { required, email },
    passwd: { required, minLength: minLength(6) },
    passwdConfirm: { sameAs: sameAs("passwd") },
  },
};
</script>
