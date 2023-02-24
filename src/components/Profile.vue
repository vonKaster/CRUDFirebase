<template>
  <v-container>
    <v-layout column align-center mt-5>
      <v-flex>
        <div class="avatar-container" @click="openFileInput">
          <v-avatar color="#d9d9d9" size="136">
            <img :src="user.photosrc" />
            <input @change="loadImage($event)" ref="fileInput" type="file" style="display: none" />
          </v-avatar>
          <v-icon size="30" class="edit-icon">mdi-pencil</v-icon>
        </div>
      </v-flex>
      <v-flex>
        <h3 class="text-center mt-2">{{ user.name }}</h3>
        <h3 class="text-center mt-2">Email: {{ user.email }}</h3>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import { storage, auth } from "../firebase";
export default {
  name: "Profile",

  data() {
    return {
        file: null,
    };
  },

  mounted() {},

  methods: {
    openFileInput() {
      this.$refs.fileInput.click();
    },
    async loadImage(event){
        this.file = event.target.files[0];
        try {
            const imgRef = storage.ref().child(this.user.email).child('profilePhoto');
            const res = await imgRef.put(this.file);
            const urlImgDownload = await imgRef.getDownloadURL();
            console.log(urlImgDownload);
            this.user.photosrc = urlImgDownload;

            await auth.currentUser.updateProfile({
            photoURL: urlImgDownload
          })

        } catch (error) {
            console.log(error)
        }
    }
  },

  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped>
.avatar-container {
  position: relative;
  display: inline-block;
}

.avatar-container:hover img {
  filter: blur(5px);
  transition: filter ease-out 0.2s;
  cursor: pointer;
}

.edit-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
