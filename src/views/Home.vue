<template>
  <div class="container mx-auto lg:p-36 px-3 py-20 grid gap-36">
    <div>
      <h1
        data-aos="fade-left"
        data-aos-duration="1000"
        class="text-4xl font-medium p-4 bg-purple-800 text-white rounded shadow-md mb-3"
      >
        Trending News
      </h1>
      <div
      data-aos="fade-right"
      data-aos-duration="1000"
      class="grid grid-rows-1 grid-cols-5 gap-3">
        <router-link
          class="flex flex-col gap-3 hover:translate-y-1 duration-300"
          :to="{ name: 'ViewDetail', params: { id: photo._id } }"
          v-for="photo in Photos"
          :key="photo._id"
        >
          <img
            class="h-96 w-full object-cover rounded-lg"
            :src="getPhoto(photo.photo)"
            alt=""
          />
          <div class="text-wrap">
            <h1 class="font-medium text-md">
              {{ photo.title.slice(0, 50) }}...
            </h1>
          </div>
        </router-link>
      </div>
    </div>
    <HomeCardsVue :endPoint="endPoints[0]" />
    <HomeCardsVue :endPoint="endPoints[1]" />
    <HomeCardsVue :endPoint="endPoints[2]" />
    <HomeCardsVue :endPoint="endPoints[3]" />

    <div class="grid grid-cols-2 shadow-md">
      <Contact/>
      <img :src="contact__Pic" alt="" class="h-full object-cover">
    </div>
    
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import HomeCardsVue from "../components/HomeCards.vue";
import Contact from "@/components/Contact.vue";

const endPoints = ["Entertainment", "Technology", "Society", "Sports"];
const base_Photo_URL = "https://by-technology-server.onrender.com/uploads/";
const baseURL = "https://by-technology-server.onrender.com/BYAPI/v1";
const Photos = ref([]);
const contact__Pic = ref('/12953408_isometric_27.jpg')

const getPhoto = (photoURL) => {
  return base_Photo_URL + photoURL;
};

onMounted(() => {
  try {
    axios.get(baseURL + 5).then((response) => {
      // (Photos.value = response.data.data.map(data => data.photo))
      Photos.value = response.data.data;
    });
  } catch (error) {
    console.log(error);
  }
});
</script>
