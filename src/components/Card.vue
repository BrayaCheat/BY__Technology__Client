<template>
  <div v-if="cards.length > 0" class="grid lg:grid-cols-3 gap-9">
    <router-link
      data-aos="fade-in"
      data-aos-duration="1500"
      @click="reloadPage"
      :to="{ name: 'ViewDetail', params: { id: card._id } }"
      v-for="card in cards"
      :key="card._id"
      class="shadow-md rounded flex flex-col items-start gap-6 bg-white"
    >
      <img
        :src="getPhoto(card.photo)"
        alt=""
        class="w-full h-80 object-cover rounded-t"
      />
      <div class="px-6 flex flex-col gap-9 pb-9 bg-white">
        <h1 class="text-sm">{{ new Date(card.createdAt).toDateString() }}</h1>
        <h1 class="text-lg font-medium">{{ card.title.slice(0, 75) }}...</h1>
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <img
              :src="author.photoURL"
              alt=""
              class="w-10 rounded-full shadow"
            />
            <h1>{{ author.displayName || author.email }}</h1>
          </div>
          <router-link
            @click="reloadPage"
            :to="{ name: 'ViewDetail', params: { id: card._id } }"
            class="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 font-medium shadow rounded flex items-center"
            >Read more >></router-link
          >
        </div>
      </div>
    </router-link>
  </div>
  <div v-else>
    <div
      class="flex items-center justify-center w-56 h-56 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
    >
      <div
        class="px-3 py-1 text-xs font-medium leading-none text-center text-blue-800 bg-blue-200 rounded-full animate-pulse dark:bg-blue-900 dark:text-blue-200"
      >
        loading...
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeMount } from "vue";
import { ref } from "vue";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import router from "@/router";

const type = defineProps(["endPoint"]);

const baseURL = "http://localhost:3000/BYAPI/v1/category/";
const base_Photo_URL = "http://localhost:3000/uploads/";
const cards = ref([]);
const author = ref({});
let auth = getAuth();

const reloadPage = () => {
  setTimeout(() => {
    location.reload();
  }, 1000);
};

const getPhoto = (photoURL) => {
  return base_Photo_URL + photoURL;
};

const isAuth = () => {
  try {
    auth.onAuthStateChanged((user) => {
      user ? (author.value = user) : (author.value = "Adminstrator");
    });
  } catch (error) {
    console.log(error);
  }
};

onMounted(async () => {
  try {
    isAuth();
    await axios
      .get(baseURL + type.endPoint)
      .then((response) => (cards.value = response.data.data));
  } catch (error) {
    console.log(error);
  }
});
</script>

<style lang="scss" scoped></style>
