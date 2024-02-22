<template>
  <div class="bg-zinc-100">
    <Navbar/>
    <router-view/>
    <FooterVue/>
  </div>
</template>

<script setup>
  import Navbar from "./components/Navbar.vue";
  import FooterVue from "./components/Footer.vue";
  import { useCounterStore } from "./stores/counter";
  
  // import {signInWithPopup, GoogleAuthProvider, getAuth} from 'firebase/auth'

  // const onGoogleLogin = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider()
  //     signInWithPopup(getAuth(), provider)
  //     .then(() => {
  //       console.log('Login Success!')
  //     })
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
</script>
