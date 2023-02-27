<template>
  <v-container>
    <v-layout column align-center mt-4>
      <v-card class="pa-8" width="500px">
        <v-flex>
          <div class="avatar-container" @click="openFileInput">
            <v-avatar color="#d9d9d9" size="136">
              <img :src="user.photosrc" />
              <input
                @change="loadImage($event)"
                ref="fileInput"
                type="file"
                style="display: none"
              />
            </v-avatar>
            <v-icon size="30" class="edit-icon">mdi-pencil</v-icon>
          </div>
        </v-flex>
        <v-flex>
          <v-text-field
            v-model="user.name"
            solo
            dense
            class="mt-4"
            append-icon="mdi-pencil"
            color="indigo"
            @blur="changeUserName(user.name)"
          >
          </v-text-field>
          <h3 id="email" class="text-center text-overline">
            <v-icon small color="indigo">mdi-email</v-icon> {{ user.email.toString() }}
          </h3>
          <h3 class="text-overline">
            <v-icon class="mr-2" color="indigo">mdi-note</v-icon>
            {{ this.tasks.length }}
            {{ this.tasks.length === 1 ? "tarea" : "tareas" }}
          </h3>
          <p
            v-if="error === 'nameErr'"
            style="color: #ff5252"
            class="text-center mt-4 text-overline"
          >
            Debe contener entre 3 y 14 caracteres.
          </p>
          <p
            v-if="success === 'nameSuccess'"
            style="color: #4CAF50"
            class="text-center mt-4 text-overline"
          >
            Nombre actualizado con éxito.
          </p>
          <div>
            <v-divider class="mt-3"></v-divider>
            <h2 class="text-center mt-3">Cambiar Contraseña</h2>
            <v-form @submit.prevent="changePassword($v.passwd.$model)">
              <v-text-field
                solo
                dense
                append-icon="mdi-lock"
                color="indigo"
                label="Nueva Contraseña"
                class="mt-2"
                v-model="$v.passwd.$model"
                type="password"
              ></v-text-field>
              <v-text-field
                solo
                dense
                append-icon="mdi-lock-check"
                color="indigo"
                label="Repita Contraseña"
                v-model="$v.passwdConfirm.$model"
                type="password"
              ></v-text-field>
              <div id="passwdErrors">
                <small
                  v-if="!$v.passwd.required"
                  class="text-overline"
                  style="color: #3f51b5"
                  >Contraseña requerida *</small
                >
                <small
                  v-if="!$v.passwd.minLength"
                  class="text-overline"
                  style="color: #3f51b5"
                  >debe contener al menos 6 caracteres*</small
                >
              </div>

              <div id="passwdConfirmErrors">
                <small
                  v-if="!$v.passwdConfirm.sameAs"
                  class="text-overline"
                  style="color: #3f51b5"
                  >Las contraseñas deben coincidir</small
                >
              </div>
              <v-btn
                :disabled="$v.$invalid"
                type="submit"
                color="indigo"
                style="color: #ffffff"
                width="100%"
                >Cambiar</v-btn
              >
            </v-form>
            <p
              v-if="error === 'auth/requires-recent-login'"
              style="color: #ff5252"
              class="text-center mt-4 text-overline"
            >
              La operación es sensible y requiere que te hayas logueado
              recientemente, por favor vuelve a loguearte.
            </p>
            <p
              v-if="success === 'passwdSuccess'"
              style="color: #4CAF50"
              class="text-center mt-4 text-overline"
            >
              Contraseña actualizada con éxito.
            </p>
          </div>
        </v-flex>
      </v-card>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { storage, auth } from "../firebase";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Profile",

  data() {
    return {
      file: null,
      passwd: "",
      passwdConfirm: "",
    };
  },

  mounted() {
    const nameDetails = document.querySelector(".v-messages__wrapper");
    const passwdInputDetails = document.querySelectorAll(
      ".v-messages__wrapper"
    )[1];
    const passwdConfirmInputDetails = document.querySelectorAll(
      ".v-messages__wrapper"
    )[2];
    if (nameDetails && passwdInputDetails && passwdConfirmInputDetails) {
      const email = document.getElementById("email");
      const passwdErrors = document.getElementById("passwdErrors");
      const passwdConfirmErrors = document.getElementById(
        "passwdConfirmErrors"
      );
      nameDetails.replaceWith(email);
      passwdInputDetails.replaceWith(passwdErrors);
      passwdConfirmInputDetails.replaceWith(passwdConfirmErrors);
    }
  },

  created(){
    document.title = "CRUD | Perfil";
  },

  methods: {
    ...mapActions(["changeUserName", "changePassword"]),
    openFileInput() {
      this.$refs.fileInput.click();
    },
    async loadImage(event) {
      this.file = event.target.files[0];
      try {
        const imgRef = storage
          .ref()
          .child(this.user.email)
          .child("profilePhoto");
        const res = await imgRef.put(this.file);
        const urlImgDownload = await imgRef.getDownloadURL();
        console.log(urlImgDownload);
        this.user.photosrc = urlImgDownload;

        await auth.currentUser.updateProfile({
          photoURL: urlImgDownload,
        });
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    ...mapState(["user", "tasks", "error", "success"]),
  },

  validations: {
    passwd: { required, minLength: minLength(6) },
    passwdConfirm: { sameAs: sameAs("passwd") },
  },
};
</script>

<style scoped>
.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.avatar-container v-avatar img {
  max-width: 100%;
  max-height: 100%;
}

.avatar-container:hover img {
  filter: blur(5px);
  transition: filter ease-out 0.2s;
  cursor: pointer;
}

.edit-icon {
  position: absolute;
  font-size: 20px;
  color: white;
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.avatar-container:hover .edit-icon {
  opacity: 1;
}
</style>
