<template>
    <div class="container mx-auto lg:p-36 p-9 lg:mt-0 mt-20" v-if="data">
        <header class="flex flex-col gap-9">
            <h1
            data-aos="fade-right"
            data-aos-duration="1500"
            class="font-bold text-4xl text-start">{{ data.title }}</h1>
            <div
            data-aos="fade-in"
            data-aos-duration="1500"
            class="flex items-center justify-evenly font-medium">|
                <h1>{{ author.displayName || author.email }}</h1>|
                <h1>{{ new Date(data.createdAt).toDateString() }}</h1>|
                <h1>{{ data.type }}</h1>|
            </div>
        </header>
        <main class="flex flex-col items-start gap-9 py-9">
            <img
            data-aos="fade-right"
            data-aos-duration="1500"
            id="main__Photo" :src="getPhoto(data.photo)" alt="" class="lg:object-contain object-cover rounded shadow">
            <article
            data-aos="fade-left"
            data-aos-duration="1500"
            class="font-medium text-lg">{{ data.article }}</article>
        </main>
        <h1 class="text-4xl font-bold mt-6">Related To</h1>
        <hr class="border border-zinc-300 my-9">
        <Card v-if="endPoint" :endPoint="endPoint"/>
    </div>
    <div v-else>
        <div
          class="p-36 text-4xl font-medium leading-none text-center  rounded-full animate-pulse"
        >
          loading...
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Card from "@/components/Card.vue";

    const idFromParent = defineProps(['id'])
    const baseURL = "http://localhost:3000/BYAPI/v1/";
    const data = ref({})
    const author = ref({})
    let auth = getAuth()
    const base_Photo_URL = "http://localhost:3000/uploads/"
    const endPoint = ref("")

    const getPhoto = (photoURL) => {
        return base_Photo_URL + photoURL
    }

    const isAuth = () => {
        try {
            auth.onAuthStateChanged((user) => {
                user ? author.value = user : author.value = "Adminstrator"
            })
        } catch (error) {
            console.log(error)
        }
    }

    onMounted(async () => {
        try {
            isAuth()
            await axios.get(baseURL + idFromParent.id)
            .then((response) => {
                data.value = response.data.data
                endPoint.value = response.data.data.type
            })
        } catch (error) {
            console.log(error)   
        }
    })
</script>

<style>
#main__Photo{
    width: 100%;
    height: 600px;
}
</style>
