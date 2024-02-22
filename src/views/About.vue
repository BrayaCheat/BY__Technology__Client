<template>
  <div class="container mx-auto p-36 grid place-items-start">
    <div class="grid gap-6">
      <h1 class="text-4xl font-medium">About BY Technology KH</h1>
      <p>
        BY Technology was developed by a young man which is called BrayaCheat,
        He is a student who currently study in Royal University of Phnom Penh
      </p>
      <ul class="grid gap-3">
        <p class="text-2xl font-medium">The purpose of BY Technology KH</p>
        <li v-for="purpose in purposes" :key="purpose.title">
          <h1>{{purpose.title }}</h1>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const purposes = ref([
  {
    title: "Share information that is related to Tech Stack",
    icon: "",
  },
  {
    title: "Share information that is related to Tech Stack",
    icon: "",
  },
  {
    title: "Share information that is related to Tech Stack",
    icon: "",
  },
  {
    title: "Share information that is related to Tech Stack",
    icon: "",
  },
]);
</script>

<style lang="scss" scoped></style>
