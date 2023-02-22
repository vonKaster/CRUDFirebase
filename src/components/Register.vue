<template>
    <v-container>
        <h1>Registro</h1>

        <v-form @submit.prevent="createUser({email: email, passwd: passwd})">
            <v-text-field type="email" placeholder="Ingrese su correo electŕonico" v-model="email"/>
            <v-text-field type="password" placeholder="Ingrese su contraseña" v-model="passwd"/>
            <v-text-field type="password" placeholder="Repita su contraseña" v-model="passwdConfirm"/>
            <v-btn :disabled="!validatePasswd" color="success" type="submit">Enviar</v-btn>
        </v-form>
        <p>{{ error }}</p>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
    name: 'Register',

    data() {
        return {
            email: '',
            passwd: '',
            passwdConfirm: ''
        };
    },

    mounted() {
        
    },

    methods: {
        ...mapActions(['createUser'])
        
    },

    computed: {
        ...mapState(['error']),

        validatePasswd(){
            return this.passwd === this.passwdConfirm && this.passwd.trim() !== '' && this.passwd.length > 5
        }
    }
};
</script>