<template>
  <div>
    <div class="text-center mt-6 text-overline" v-if="loader">
      <h2>Cargando Contenido</h2>
      <pulse-loader :color="'#3f51b5'"></pulse-loader>
    </div>
    <div v-if="!loader">
      <v-card>
        <v-card-text>
          <h3 style="color: black" class="text-overline">Bienvenido {{ user.name }}</h3>
        </v-card-text>

        <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
          <div
            :class="message.uid === user.uid ? 'text-right' : 'text-left'"
            v-for="(message, index) in messages"
            :key="index"
          >
            <v-chip color="indigo" style="color: #ffffff">
              <v-avatar class="mr-1"> <img :src="message.photo" /> </v-avatar
              >
              <h4 class="mr-1">{{ message.name }}:</h4>
              {{ message.message }}
            </v-chip>
            <p class="caption mr-2">{{ message.date }}</p>
          </div>
        </v-card-text>

        <v-card-text style="height: 100px;">
          <v-form @submit.prevent="sendMessage">
            <v-text-field
              solo
              dense
              required
              append-icon="mdi-message-outline"
              color="indigo"
              label="Escribe tu mensaje"
              class="mt-2"
              v-model="message"
            ></v-text-field>

            <div id="validations">
              <p
                style="color: #3f51b5"
                class="text-overline"
                v-show="!$v.message.required"
              >
                El mensaje es requerido
              </p>
            </div>
          </v-form>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { required } from "vuelidate/lib/validators";
import { db } from "../firebase";
import moment from "moment";
import PulseLoader from "vue-spinner/src/PulseLoader.vue";
export default {
  name: "Chat",
  components: { PulseLoader: PulseLoader },

  data() {
    return {
      message: "",
      messages: [],
    };
  },

  mounted() {
    this.moveValidations();
  },

  updated() {
    this.moveValidations();
  },

  created() {
    document.title = "CRUD | Chat";
    moment.locale("es");
    this.getMessages();
  },

  methods: {
    ...mapMutations(["setLoader"]),
    sendMessage() {
      if (this.$v.$invalid) {
        console.log("Completa tu mensaje");
      } else {
        console.log(this.message);

        db.collection("chats")
          .add({
            name: this.user.name,
            message: this.message,
            uid: this.user.uid,
            photo: this.user.photosrc,
            date: Date.now(),
          })
          .catch((err) => console.log(err));

        this.message = null;
      }
    },
    getMessages() {
      this.setLoader(true);
      let ref = db.collection("chats").orderBy("date", "desc").limit(12);
      ref.onSnapshot((querySnapshot) => {
        this.messages = [];

        querySnapshot.forEach((doc) => {
          this.messages.unshift({
            name: doc.data().name,
            message: doc.data().message,
            photo: doc.data().photo,
            uid: doc.data().uid,
            date: moment(doc.data().date).format("lll"),
          });
        });
      });
      setTimeout(() => {
        this.setLoader(false);
      }, 1000);
    },
    moveValidations() {
      const inputDetails = document.querySelector(".v-messages__wrapper");
      if (inputDetails) {
        const validations = document.getElementById("validations");
        inputDetails.replaceWith(validations);
      }
    },
  },

  computed: {
    ...mapState(["user", "loader"]),
  },

  validations: {
    message: { required },
  },
};
</script>
