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
          <v-text-field outlined v-model="task.name" />
          <v-btn color="warning" type="submit">Editar</v-btn>
        </v-form>
      </div>
    </v-container>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "editTask",

  data() {
    return {
      id: this.$route.params.id,
    };
  },

  created() {
    this.getTask(this.id);
  },

  methods: {
    ...mapActions(["getTask", "editTask"]),
  },

  computed: {
    ...mapState(["task"]),
  },
};
</script>
