<template>
    <v-container>
      <v-btn class="mt-4 mb-4" @click="$router.go(-1)"
        ><v-icon color="black">mdi-chevron-left</v-icon></v-btn
      >
      <h1>Editar Tarea</h1>
      {{ task.id }} - {{ task.name }}
      <v-form @submit.prevent="editTask(task)">
        <v-text-field v-model="task.name"/>
        <v-btn color="warning" type="submit">Editar</v-btn>
      </v-form>
    </v-container>
  </template>
  
  <script>
  import {mapActions, mapState} from 'vuex'
  export default {
    name: "editTask",

    data() {
      return {
        id: this.$route.params.id
      }
    },

    created(){
      this.getTask(this.id)
    },
  
    methods: {
      ...mapActions(['getTask', 'editTask'])
    },

    computed:{
      ...mapState(['task'])
    }

  };
  </script>
  