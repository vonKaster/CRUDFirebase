<template>
  <v-container class="">
    <v-row>
      <v-container class="formLoginContainer">
        <h1 class="text-center">Acceso</h1>
        <br />
        <v-form
          @submit.prevent="
            signIn({
              provider: 'email',
              credentials: { email: $v.email.$model, passwd: $v.passwd.$model },
            })
          "
        >
          <v-text-field
            color="indigo"
            outlined
            type="email"
            placeholder="Ingrese su correo electŕonico"
            v-model="$v.email.$model"
            append-icon="mdi-account"
            :rules="rulesEmail"
          />
          <div class="d-flex">
            <v-text-field
              class="flex-grow-1"
              color="indigo"
              outlined
              :type="showPassword ? 'text' : 'password'"
              placeholder="Ingrese su contraseña"
              v-model="$v.passwd.$model"
              append-icon="mdi-lock"
              :rules="rulesPasswd"
            />
            <v-btn
              icon
              @click="showPassword = !showPassword"
              :color="showPassword ? 'indigo' : undefined"
              class="ml-2 mt-2"
            >
              <v-icon>{{ showPassword ? "mdi-eye-off" : "mdi-eye" }}</v-icon>
            </v-btn>
          </div>
          <v-btn
            :disabled="$v.$invalid"
            style="color: #ffffff"
            color="#3f51b5"
            type="submit"
            >Ingresar</v-btn
          >
        </v-form>
        <p
          v-show="error === 'auth/user-not-found'"
          style="color: #ff5252"
          class="text-center mt-4 text-overline"
        >
          Usuario Incorrecto
        </p>
        <p
          v-if="error === 'auth/wrong-password'"
          style="color: #ff5252"
          class="text-center mt-4 text-overline"
        >
          Contraseña incorrecta
        </p>
        <p
          v-if="error === 'auth/too-many-requests'"
          style="color: #ff5252"
          class="text-center mt-4 text-overline"
        >
          Se congeló el acceso a esta cuenta temporalmente debido a muchos
          intentos fallidos.
        </p>
        <br />
        <v-divider :thickness="4"></v-divider>
        <v-container>
          <div class="mx-auto text-center">
            <v-btn
              @click="signIn({ provider: 'google' })"
              x-large
              icon
              color="#3f51b5"
              ><v-icon>mdi-google</v-icon></v-btn
            >
            <v-btn
              @click="signIn({ provider: 'github' })"
              x-large
              icon
              color="#3f51b5"
              ><v-icon>mdi-github</v-icon></v-btn
            >
            <v-btn
              @click="signIn({ provider: 'facebook' })"
              x-large
              icon
              color="#3f51b5"
              ><v-icon>mdi-facebook</v-icon></v-btn
            >
          </div>
        </v-container>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import { required, minLength, email } from "vuelidate/lib/validators";

export default {
  name: "Login",

  data() {
    return {
      email: "",
      passwd: "",
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
      showPassword: false,
    };
  },

  created() {
    document.title = "CRUD | Acceso";
    const style = document.createElement("style");
    style.setAttribute("id", "custom-main-style");
    style.textContent = `
      main {
        background-image: url(https://raw.githubusercontent.com/vonKaster/CRUDFirebase/7283bc9dffd71802379d2effd29f93267bd85580/src/assets/waveLogin.svg)!important;
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

  updated() {
    if (
      this.error === "auth/user-not-found" ||
      this.error === "auth/wrong-password" ||
      this.error === "auth/too-many-requests"
    ) {
      this.createSpacer();
    }
  },

  beforeDestroy() {
    const style = document.getElementById("custom-main-style");
    const spacer = document.getElementById("custom-spacer");
    if (style) {
      document.head.removeChild(style);
      document.head.removeChild(spacer);
    }
    this.setError(null);
  },

  computed: {
    ...mapState(["error"]),
  },

  methods: {
    ...mapActions(["signIn"]),
    ...mapMutations(["setError"]),

    createSpacer() {
      console.log("ejecutada");
      const style = document.createElement("style");
      style.setAttribute("id", "custom-spacer");
      style.textContent = `
      @media (max-width: 600px) {
        .formLoginContainer {
           height: 80vh;
        }
      }
      
    `;
      document.head.appendChild(style);
    },
  },

  validations: {
    email: { required, email },
    passwd: { required, minLength: minLength(6) },
  },
};
</script>

<style scoped>
.text-field-wrapper {
  width: 100%;
  display: inline-block;
}
</style>
