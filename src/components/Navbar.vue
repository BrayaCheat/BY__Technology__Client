<template>
  <nav
    class="fixed w-full z-50 top-0 start-0 border-b border-zinc-300 bg-purple-800"
  >
    <div
      class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
    >
      <router-link
        to="/"
        class="flex items-center space-x-3 rtl:space-x-reverse"
      >
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap text-white"
          >BY Technology KH</span
        >
      </router-link>
      <div
        class="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative"
      >
        <span class="flex items-center gap-3" v-if="isLoggedIn">
          <!-- <h1 class="font-medium text-purple-800">
            {{ admin__account.name || admin__account.email }}
          </h1> -->
          <img
            @click="onDropDownBtn"
            :src="admin__account.profile"
            alt="admin__profile"
            class="w-10 h-10 rounded-full drop-shadow cursor-pointer"
          />
          <span v-if="isLoggedOut">
            <button
              @click="onLogoutBtn"
              class="bg-red-600 text-white font-medium shadow rounded p-2"
            >
              Logout
            </button>
          </span>
        </span>
        <router-link
          v-if="!isLoggedIn"
          to="/Login"
          class="text-white flex items-center gap-3 flex-row-reverse bg-purple-800 hover:bg-purple-900 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded text-sm px-4 py-2 text-center"
        >
          Login
          <span class="material-symbols-outlined"> account_circle </span>
        </router-link>
        <button
          data-collapse-toggle="navbar-sticky"
          type="button"
          class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-sticky"
          aria-expanded="false"
        >
          <span class="sr-only">Open main menu</span>
          <svg
            class="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
      </div>
      <div
        class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        id="navbar-sticky"
      >
        <ul
          class="flex flex-col p-4 md:p-0 mt-4 font-medium rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0"
        >
          <li v-if="isLoggedIn">
            <router-link
              to="/Dashboard"
              class="block py-2 px-3 text-white hover:underline rounded md:p-0"
              aria-current="page"
              >Dashboard</router-link
            >
          </li>
          <li>
            <router-link
              to="/"
              class="block py-2 px-3 text-white hover:underline rounded md:p-0"
              aria-current="page"
              >Home</router-link
            >
          </li>
          <li>
            <router-link
              to="/Entertainment"
              class="block py-2 px-3 rounded hover:bg-purple md:p-0 text-white hover:underline"
              >Entertainment</router-link
            >
          </li>
          <li>
            <router-link
              to="/Technology"
              class="block py-2 px-3 rounded hover:bg-purple md:p-0 text-white hover:underline"
              >Technology</router-link
            >
          </li>
          <li>
            <router-link
              to="/Society"
              class="block py-2 px-3 rounded hover:bg-purple md:p-0 text-white hover:underline"
              >Life and Society</router-link
            >
          </li>
          <li>
            <router-link
              to="/Sports"
              class="block py-2 px-3 rounded hover:bg-purple md:p-0 text-white hover:underline"
              >Sports</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import {
  signInWithPopup,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const isLoggedIn = ref(false);
const isLoggedOut = ref(false);
let auth = getAuth();
const admin__account = ref({
  name: "",
  email: "",
  profile: "",
});
const router = useRouter()

onMounted(async () => {
    try {
        auth.onAuthStateChanged((user) => {
            if(user){
                isLoggedIn.value = true
                admin__account.value.name = user.displayName
                admin__account.value.email = user.email
                admin__account.value.profile = user.photoURL
            }else{
                isLoggedIn.value = false
            }
        })
    } catch (error) {
      console.log(error)  
    }
})

const onDropDownBtn = async () => {
  try {
    isLoggedOut.value = !isLoggedOut.value;
  } catch (error) {
    console.log(error);
  }
};

const onLogoutBtn = async () => {
  try {
    signOut(auth).then(() => {
      Swal.fire({
        icon: "success",
        title: "Logout Successful!",
        text: ``,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      setTimeout(() => {
        router.push('/')
      }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
