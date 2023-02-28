<template>
  <v-container>
    <v-row>
      <v-container class="formLoginContainer">
        <h1 class="text-center">Registro</h1>
        <br />
        <v-form
          @submit.prevent="
            createUser({ email: $v.email.$model, passwd: $v.passwd.$model, name: $v.name.$model })
          "
        >
          <v-text-field
            color="indigo"
            append-icon="mdi-email"
            outlined
            type="email"
            placeholder="Ingrese su correo electŕonico"
            v-model="$v.email.$model"
            :rules="rulesEmail"
          />
          <v-text-field
            color="indigo"
            append-icon="mdi-account"
            outlined
            type="text"
            placeholder="Ingrese un usuario"
            v-model="$v.name.$model"
            :rules="rulesName"
          />
          <v-text-field
            color="indigo"
            append-icon="mdi-lock"
            outlined
            type="password"
            placeholder="Ingrese su contraseña"
            v-model="$v.passwd.$model"
            :rules="rulesPasswd"
          />
          <v-text-field
            color="indigo"
            append-icon="mdi-lock-check"
            outlined
            type="password"
            placeholder="Repita su contraseña"
            v-model="passwdConfirm"
            :rules="rulesPasswdConfirm"
          />
          <v-btn :disabled="$v.$invalid" color="indigo" style="color: #ffffff" type="submit"
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
import { mapActions, mapState, mapMutations } from "vuex";
import { required, minLength, email, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Register",

  data() {
    return {
      email: "",
      name: "",
      passwd: "",
      passwdConfirm: "",
      rulesEmail: [
        (v) => !!v || "El email es requerido",
        (v) => /.+@.+\..+/.test(v) || "El correo electrónico no es válido",
      ],
      rulesPasswd: [
        (v) => !!v || "La contraseña es requerida",
        (v) =>
          (v && v.length >= 6) ||
          "La contraseña debe tener al menos 6 caracteres",
      ],
      rulesPasswdConfirm: [
        (v) => !!v || "La confirmación de contraseña es requerida",
        (v) => v === this.passwd || "Las contraseñas no coinciden",
      ],
      rulesName: [
        (v) => !!v || "El nombre es requerido",
        (v) =>
          (v && v.length >= 3) ||
          "El usuario debe tener al menos 3 caracteres",
      ],
    };
  },

  created() {
    document.title = "CRUD | Registro";
    const style = document.createElement("style");
    style.setAttribute("id", "custom-main-style");
    style.textContent = `
    main {
        background-image: url(https://raw.githubusercontent.com/vonKaster/CRUDFirebase/7283bc9dffd71802379d2effd29f93267bd85580/src/assets/waveRegister.svg)!important;
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

  beforeDestroy() {
    const style = document.getElementById("custom-main-style");
    if (style) {
      document.head.removeChild(style);
    }
    this.setError(null);
  },

  methods: {
    ...mapActions(["createUser"]),
    ...mapMutations(["setError"]),
  },

  computed: {
    ...mapState(["error"]),
  },

  validations: {
    email: { required, email },
    name: { required, minLength: minLength(3) },
    passwd: { required, minLength: minLength(6) },
    passwdConfirm: { sameAs: sameAs("passwd") },
  },
};
</script>
