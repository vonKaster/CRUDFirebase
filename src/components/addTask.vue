<template>
  <v-container>
    <v-btn color="indigo" text class="mt-4 mb-4" @click="$router.go(-1)"
      ><v-icon>mdi-chevron-left</v-icon></v-btn
    >
    <v-container class="editTaskContainer elevation-1">
      <div class="pa-4">
        <h1 class="text-center">Agregar Tarea</h1>
        <v-form @submit.prevent="addTask($v.name.$model)">
          <v-text-field
            color="indigo"
            append-icon="mdi-note-plus"
            class="mt-3"
            outlined
            label="Nombre"
            v-model="$v.name.$model"
          />
          <div id="errors">
            <small
              v-if="!$v.name.required"
              class="text-overline"
              style="color: #ff5252"
              >Campo Requerido *</small
            >
            <small
              v-if="!$v.name.minLength"
              class="text-overline"
              style="color: #ff5252"
              >Debe tener al menos 5 caracteres *</small
            >
          </div>
          <v-btn
            color="indigo"
            style="color: #ffffff"
            type="submit"
            :disabled="$v.$invalid || loader"
            >Agregar</v-btn
          >
        </v-form>
      </div>
    </v-container>
    <v-snackbars bottom right :objects.sync="this.snackBarAlerts">
      <template v-slot:action="{ close }">
        <v-btn text @click="close()">Cerrar</v-btn>
      </template>
    </v-snackbars>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import VSnackbars from "v-snackbars";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "addTask",
  components: { "v-snackbars": VSnackbars },

  data() {
    return {
      name: "",
    };
  },

  mounted() {
    const messagesWrapper = document.querySelector(".v-messages__wrapper");
    if (messagesWrapper) {
      const errors = document.getElementById("errors");
      messagesWrapper.replaceWith(errors);
    }
  },

  created() {
    document.title = "CRUD | Agregar Tarea";
  },

  computed: {
    ...mapState(["snackBarAlerts", "loader"]),
  },

  methods: {
    ...mapActions(["addTask"]),
  },

  validations: {
    name: {
      required,
      minLength: minLength(5),
    },
  },
};
</script>

<style scoped>
.required-text {
  color: #ff5252;
}
</style>
