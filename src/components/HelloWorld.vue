<template>
  <v-container class="mx-auto text-center">
    <h1>Simple CRUD | Firebase</h1>
    <v-btn class="mt-3 mb-2" color="success" :to="{ name: 'addTask' }"
      >Agregar Tarea</v-btn
    >

    <div class="text-center mt-6 text-overline " v-if="loader">
      <h2>Cargando Contenido</h2>
      <pulse-loader :color="'#3f51b5'"></pulse-loader>
    </div>

    <v-data-table
      v-if="!loader"
      :headers="headers"
      :items="tasks"
      :items-per-page="10"
      class="elevation-3 mt-6 tasksTable"
    >
      <template slot="item.actions" slot-scope="{ item }">
        <v-btn
          text
          color="warning"
          :to="{ name: 'editTask', params: { id: item.id } }"
          ><v-icon class="mr-1">mdi-pencil</v-icon>Editar</v-btn
        >
        <v-btn text color="error" class="ms-4" @click="deleteTask(item.id)"
          ><v-icon class="mr-1">mdi-delete</v-icon>Eliminar</v-btn
        >
      </template>
      <template slot="headerCell" slot-scope="props">
        <div
          class="v-data-table__header v-data-table__thead"
          :style="{ textAlign: props.align }"
        >
          {{ props.header.text }}
        </div>
      </template>
    </v-data-table>
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
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "HomeComponent",
  components: { "v-snackbars": VSnackbars, PulseLoader: PulseLoader },

  created() {
    this.getTasks();
    document.title = "Digicard | Inicio";
  },

  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Nombre", value: "name" },
      { text: "Acciones", value: "actions", align: "right" },
    ],
  }),

  methods: {
    ...mapActions(["getTasks", "deleteTask"]),
  },

  computed: {
    ...mapState(["tasks", "snackBarAlerts", "loader"]),
  },
};
</script>
