<template>
  <v-container>
    <v-btn color="indigo" text class="mt-4 mb-4" @click="$router.go(-1)"
      ><v-icon>mdi-chevron-left</v-icon></v-btn
    >
    <v-container class="editTaskContainer elevation-1">
      <div class="pa-4">
        <h1 class="text-center">Agregar Tarea</h1>
        <v-form @submit.prevent="addTask(name)">
          <v-text-field
            append-icon="mdi-note-plus"
            class="mt-3"
            outlined
            label="Nombre"
            v-model="name"
          />
          <v-btn color="success" type="submit">Agregar</v-btn>
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
export default {
  name: "addTask",
  components: { "v-snackbars": VSnackbars },

  data() {
    return {
      name: "",
    };
  },

  created() {
    document.title = "CRUD | Agregar Tarea";
  },

  computed: {
    ...mapState(["snackBarAlerts"]),
  },

  methods: {
    ...mapActions(["addTask"]),
  },
};
</script>
