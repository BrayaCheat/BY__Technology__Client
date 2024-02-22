<template>
  <div class="grid grid-cols-4 place-items-between gap-9">
    <div class="col-span-4">
      <h1 class="font-medium text-4xl text-purple-800">
        Adminstartor Dashboard
      </h1>
    </div>
    <hr class="col-span-4 border border-zinc-300" />
    <div
      class="px-9 py-3 bg-white rounded shadow-md flex flex-col items-center lg:col-span-1 col-span-4"
    >
      <h1 class="font-bold text-xl">Total Posts</h1>
      <h1 class="font-bold text-xl text-purple-800">{{ Amount__Of__Posts.length }}</h1>
    </div>
    <div
      class="col-span-4 flex items-center gap-9 font-medium text-purple-800 text-xl"
    >
      <button @click="onShowTable" class="focus:underline">Table</button>
      <button @click="onShowPost" class="focus:underline">Create Post</button>
    </div>
    <hr class="col-span-4 border border-zinc-300" />
    <div v-if="showTable" class="col-span-4">
      <TableVue />
    </div>
    <div v-if="ShowPost" class="col-span-4">
      <CreatePostVue />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import CreatePostVue from "./CreatePost.vue";
import TableVue from "./Table.vue";
import axios from 'axios'

const showTable = ref(false);
const ShowPost = ref(false);

onMounted(async () => {
  try {
    showTable.value = true;
  } catch (error) {
    console.log(error);
  }
});

const statistics = ref([
  {
    id: 1,
    name: "Total Posts",
    amount: 24,
  },
  {
    id: 2,
    name: "Total Views",
    amount: 120,
  },
  {
    id: 3,
    name: "Total Likes",
    amount: "1.2K",
  },
  {
    id: 4,
    name: "Total Shares",
    amount: 345,
  },
]);
const Amount__Of__Posts = ref([])

const onShowTable = async () => {
  try {
    showTable.value = !showTable.value;
    ShowPost.value = false;
  } catch (error) {
    console.log(error);
  }
};

const onShowPost = async () => {
  try {
    ShowPost.value = !ShowPost.value;
    showTable.value = false;
  } catch (error) {
    console.log(error);
  }
};

const totalPost = onMounted(async () => {
    try {
        await axios.get('http://localhost:3000/BYAPI/v1/')
        .then((response) => {
            Amount__Of__Posts.value = response.data.data         
        })
    } catch (error) {
        console.log(error)
    }
})
totalPost()
</script>
