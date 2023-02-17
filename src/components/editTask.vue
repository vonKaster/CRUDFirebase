<template>
    <v-container>
      <h1>Editar</h1>
      {{ task.id }} - {{ task.name }}
      <v-form @submit.prevent="editTask(task)">
        <v-text-field v-model="task.name"/>
        <v-btn type="submit">Editar</v-btn>
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
  