<template>
  <div class="grid gap-9 border-b border-purple-800 pb-6 overflow-hidden">
    <h1
    data-aos="fade-left"
        data-aos-duration="1500"
      v-if="Data1.length > 0"
      class="text-4xl font-medium bg-purple-800 p-4 rounded shadow-md text-white"
    >
      {{ Data1[0].type }}
    </h1>
    <hr class="border border-zinc-300" />
    <div class="grid lg:grid-cols-3 grid-cols-1 lg:grid-rows-3 grid-rows-1 gap-4">
      <div class="col-span-2 row-span-4" v-if="Data1.length > 0">
        <div
        class="relative">
          <img
            :src="getPhoto(Data1[0].photo)"
            alt=""
            class="h-5/6 w-full object-cover rounded shadow-md"
          />
          <div
            class="w-full h-full bg-black absolute top-0 opacity-75 hover:opacity-0 duration-300"
          ></div>
        </div>

        <h1 class="text-4xl font-bold my-6">{{ Data1[0].title }}...</h1>
        <article>{{ Data1[0].article }}</article>
      </div>
      <router-link
        data-aos="fade-left"
        data-aos-duration="1500"
        :to="{ name: 'ViewDetail', params: { id: item._id } }"
        class="lg:col-start-3 col-start-1 grid gap-3"
        v-for="item in Data3"
        :key="item._id"
      >
        <img
          :src="getPhoto(item.photo)"
          alt=""
          class="h-80 object-cover w-full rounded shadow-md"
        />
        <h1 class=" my-3 font-bold text-xl">
          {{ (item.title).slice(0,50) }}...
        </h1>
        <hr class="border border-zinc-300 mb-6">
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

const props = defineProps(["endPoint"]);
const Data1 = ref({});
const Data3 = ref({});

const getPhoto = (photoURL) => {
  return "http://localhost:3000/uploads/" + photoURL;
};

onMounted(async () => {
  try {
    getOne();
    await axios
      .get("http://localhost:3000/BYAPI/v1/limitType/" + props.endPoint + "/3")
      .then((response) => {
        Data3.value = response.data.data;
      });
  } catch (error) {
    console.log(error);
  }
});

const getOne = async () => {
  try {
    await axios
      .get("http://localhost:3000/BYAPI/v1/limitType/" + props.endPoint + "/1")
      .then((response) => {
        Data1.value = response.data.data;
      });
  } catch (error) {
    console.log(error);
  }
};
</script>
