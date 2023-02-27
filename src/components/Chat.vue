<template>
  <div>
    <v-card>
      <v-card-text>
        <h3>Bienvenido {{ user.name }}</h3>
      </v-card-text>

      <v-card-text style="height: 60vh; overflow: auto" v-chat-scroll>
        <div
          :class="message.name === user.name ? 'text-right' : 'text-left'"
          v-for="(message, index) in messages"
          :key="index"
        >
          <v-chip>
            <v-avatar class="mr-2"> <img :src="message.photo" /> </v-avatar
            >{{ message.message }}
          </v-chip>
          <p class="caption mr-2">{{ message.date }}</p>
        </div>
      </v-card-text>

      <v-card-text>
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
            <p
              style="color: #3f51b5"
              class="text-overline"
              v-show="!$v.message.minLength"
            >
              El mensaje debe tener al menos 3 caracteres
            </p>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { required, minLength } from "vuelidate/lib/validators";
import { db } from "../firebase";
import moment from "moment";
export default {
  name: "Chat",

  data() {
    return {
      message: "",
      messages: [],
    };
  },

  mounted() {
    const inputDetails = document.querySelector(".v-messages__wrapper");
    if (inputDetails) {
      const validations = document.getElementById("validations");
      inputDetails.replaceWith(validations);
    }
  },

  created() {
    document.title = "CRUD | Chat";
    moment.locale("es");
    let ref = db.collection("chats").orderBy("date", "desc").limit(12);

    ref.onSnapshot((querySnapshot) => {
      this.messages = [];

      querySnapshot.forEach((doc) => {
        this.messages.unshift({
            message: doc.data().message,
            photo: doc.data().photo,
            name: doc.data().name,
            date: moment(doc.data().date).format('lll')
        });
      });
    });
  },

  methods: {
    sendMessage() {
      if (this.$v.$invalid) {
        console.log("Completa tu mensaje");
      } else {
        console.log(this.message);

        db.collection("chats")
          .add({
            message: this.message,
            name: this.user.name,
            photo: this.user.photosrc,
            date: Date.now(),
          })
          .catch((err) => console.log(err));

        this.message = null;
      }
    },
  },

  computed: {
    ...mapState(["user"]),
  },

  validations: {
    message: { required, minLength: minLength(3) },
  },
};
</script>
