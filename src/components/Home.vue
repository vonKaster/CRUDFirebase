<template>
  <v-container class="mx-auto text-center">
    <div class="text-center mt-6 text-overline" v-if="loader">
      <h2>Cargando Contenido</h2>
      <pulse-loader :color="'#3f51b5'"></pulse-loader>
    </div>
    <div v-if="!loader">
      <h1>¡Bienvenido {{ user.name }}!</h1>
      <v-btn class="mt-3 mb-2" dark color="indigo" :to="{ name: 'addTask' }"
        ><v-icon class="mr-1">mdi-note-plus</v-icon>Agregar Tarea</v-btn
      >

      <v-form @submit.prevent="(searchTasks(searchText))">
        <v-text-field :label="'Buscar'" v-on:keyup="(searchTasks(searchText))" v-model="searchText" color="indigo" append-icon="mdi-note-search" class="mt-4" outlined></v-text-field>
      </v-form>

      <v-data-table
        :headers="headers"
        :items="tasksFiltered"
        :items-per-page="10"
        class="elevation-3 mt-6 tasksTable"
      >
        <template slot="item.actions" slot-scope="{ item }">
          <v-btn
            text
            color="warning"
            :to="{ name: 'editTask', params: { id: item.id } }"
            ><v-icon class="mr-1">mdi-note-edit</v-icon>Editar</v-btn
          >
          <v-btn text color="error" class="ms-4" @click="deleteTask(item.id)"
            ><v-icon class="mr-1">mdi-note-remove</v-icon>Eliminar</v-btn
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
    </div>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
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
    searchText: ""
  }),

  methods: {
    ...mapActions(["getTasks", "deleteTask", "searchTasks"]),
  },

  computed: {
    ...mapState(["tasks", "snackBarAlerts", "loader", "user"]),
    ...mapGetters(["tasksFiltered"])
  },
};
</script>
