<template>
  <v-container>
    <v-btn color="indigo" text class="mt-4 mb-4" @click="$router.go(-1)"
      ><v-icon>mdi-chevron-left</v-icon></v-btn
    >
    <v-container class="editTaskContainer elevation-1">
      <div class="pa-4">
        <h1 class="text-center">Editar Tarea</h1>
        <h4 class="text-overline text-center mb-2">ID: {{ task.id }}</h4>
        <v-form @submit.prevent="editTask(task)">
          <v-text-field color="indigo" outlined v-model="$v.task.name.$model" />
          <div id="errors">
            <small
              v-if="!$v.task.name.required"
              class="text-overline"
              style="color: #3f51b5"
              >Campo Requerido *</small
            >
            <small
              v-if="!$v.task.name.minLength"
              class="text-overline"
              style="color: #3f51b5"
              >Debe tener al menos 5 caracteres *</small
            >
          </div>
          <v-btn :disabled="$v.$invalid || loader" color="warning" type="submit"
            ><v-icon class="mr-1">mdi-note-edit</v-icon>Editar</v-btn
          >
        </v-form>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  name: "editTask",

  data() {
    return {
      id: this.$route.params.id,
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
    document.title = "CRUD | Editar Tarea";
    this.getTask(this.id);
  },

  methods: {
    ...mapActions(["getTask", "editTask"]),
  },

  computed: {
    ...mapState(["task", "loader"]),
  },

  validations: {
    task: {
      name: { required, minLength: minLength(5) },
    },
  },
};
</script>
