<template>
  <v-container>
    <v-row>
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
              :rules="rules"
            />
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
    </v-row>
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
      rules: [
        (v) => !!v || "El nombre es requerido",
        (v) =>
          (v && v.length >= 5) ||
          "La tarea debe contener al menos 5 caracteres",
      ],
    };
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

  mounted() {
    this.$nextTick(() => {
      const nameField = this.$refs.nameField.$el;
      const errorText = nameField.querySelector(".error--text");
      if (errorText) {
        errorText.classList.replace("error--text", "error--text-custom");
      }
    });
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
.error-text-custom {
  color: green !important;
  caret-color: green !important;
}
</style>
