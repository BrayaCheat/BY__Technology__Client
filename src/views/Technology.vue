<template>
    <div class="container mx-auto lg:p-36 px-6 pt-28">
      <header class="font-medium text-4xl text-purple-800 col-span-3">
        Technology
      </header>
      <hr class="border border-zinc-300 my-9" />
      <Card :endPoint="endPoint" />
    </div>
  </template>
  
  <script setup>
  import Card from "../components/Card.vue";
  import { ref } from "vue";
  const endPoint = ref("Technology");
  </script>
  