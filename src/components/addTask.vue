<template>
  <v-container>
    <h1>Agregar Tarea</h1>
    <v-form @submit.prevent="addTask(name)">
      <v-text-field class="mt-3" outlined label="Nombre" v-model="name" />
      <v-btn color="success" type="submit">Agregar</v-btn>
    </v-form>
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

  computed: {
    ...mapState(["snackBarAlerts"]),
  },

  methods: {
    ...mapActions(["addTask"]),
  },
};
</script>
