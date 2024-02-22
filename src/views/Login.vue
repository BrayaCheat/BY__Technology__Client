<template>
  <div class="container mx-auto lg:p-36 lg:mt-0 mt-20 p-6">
    <form
      @submit.prevent="handleLogin"
      class="shadow bg-zinc-100 p-9 rounded flex flex-col gap-6"
    >
      <header>
        <h1 class="font-medium text-4xl">Login as Adminstrator</h1>
      </header>
      <hr class="border border-zinc-300" />
      <div class="flex flex-col font-medium text-lg gap-3">
        <label for="">Email</label>
        <input
          v-model="account.email"
          type="email"
          required
          placeholder="Email..."
          class="border-0 outline-none rounded shadow focus:ring-0"
        />
      </div>
      <div class="flex flex-col font-medium text-lg gap-3">
        <label for="">Password</label>
        <input
          v-model="account.password"
          type="password"
          required
          placeholder="Password"
          class="border-0 outline-none rounded shadow focus:ring-0"
        />
      </div>
      <div
        v-if="errMsg"
        class="flex justify-start items-center font-medium text-red-600"
      >
        {{ errMsg }}
      </div>
      <button
        class="px-4 py-2 flex flex-row-reverse items-center gap-3 bg-white rounded shadow w-fit font-medium"
        @click="onGoogleLogin"
      >
        <img
          :src="googleLogo"
          alt="googleLogo"
          class="w-10 bg-transparent rounded-full"
        />
        Sign in with Google
      </button>
      <div class="flex justify-end">
        <button
          type="submit"
          class="px-4 py-2 shadow rounded bg-purple-800 hover:bg-purple-900 text-white font-medium"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";
import { ref } from "vue";

const errMsg = ref(false);
const account = ref({
  email: "",
  password: "",
});
let auth = getAuth();
const router = useRouter();
const googleLogo = ref(
  "https://expresswriters.com/wp-content/uploads/2015/09/google-new-logo-450x450.jpg"
);

const onGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(() => {
      auth.onAuthStateChanged((user) => {
        Swal.fire({
          icon: "success",
          title: "Login Success!",
          text: `Welcome Admin ${user.displayName || user.email}`,
          footer: '<a href="#">Why do I have this issue?</a>',
        });
        setTimeout(() => {
          router.push("/Dashboard");
        }, 1000);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

  const handleLogin = async () => {
    try {
      signInWithEmailAndPassword(
        getAuth(),
        account.value.email,
        account.value.password
      ).then(() => {
        auth.onAuthStateChanged((user) => {
          Swal.fire({
            icon: "success",
            title: "Login Success!",
            text: `Welcome Admin ${user.displayName || user.email}`,
            footer: '<a href="#">Why do I have this issue?</a>',
          });
          setTimeout(() => {
            router.push("/Dashboard");
          }, 1000);
        });
      })
      .catch((error) => {
        switch (error.code) {
        case "auth/invalid-email":
          errMsg.value = "Invalid email";
          break;
        case "auth/user-not-found":
          errMsg.value = "No account with that email was found";
          break;
        case "auth/wrong-password":
          errMsg.value = "Incorrect password";
          break;
        case "auth/invalid-login-credentials":
          errMsg.value = "Invalid auth!";
        default:
          errMsg.value = "Email or password was incorrect";
          break;
      }
      })
    } catch (error) {
      console.log(error)
    }
  };
</script>
