<template>
    <v-container>
        <h1>Acceso</h1>
        
        <v-form @submit.prevent="signIn({email: email, passwd: passwd})">
            <v-text-field type="email" placeholder="Ingrese su correo electŕonico" v-model="email"/>
            <v-text-field type="password" placeholder="Ingrese su contraseña" v-model="passwd"/>
            <v-btn color="success" type="submit">Enviar</v-btn>
        </v-form>
        <p>{{ error }}</p>

    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Login',

    data() {
        return {
            email: '',
            passwd: ''
        };
    },

    mounted() {
        
    },

    computed: {
        ...mapState(['error']),
    },

    methods: {
        ...mapActions(['signIn'])
        
    },
};
</script>