<template>
  <form
    @submit.prevent="sendEmail"
    enctype="multipart/form-data"
    class="grid p-9 gap-6 font-medium bg-white"
  >
    <div
      class="flex justify-start items-center py-9 text-4xl font-bold text-purple-800"
    >
      <h1>Contact Us</h1>
    </div>
    <hr class="border border-zinc-300" />
    <div class="flex flex-col items-start gap-3">
      <!-- <label for="" class="text-purple-800">Your email</label> -->
      <input
        type="email"
        v-model="sender"
        required
        class="bg-gray-100 border-0 outline-none rounded shadow focus:ring-0 w-full"
        placeholder="Your email..."
      />
    </div>
    <div class="flex flex-col items-start gap-3">
      <!-- <label for="" class="text-purple-800">Subject</label> -->
      <input
        type="text"
        v-model="subject"
        required
        class="bg-gray-100 border-0 outline-none rounded shadow focus:ring-0 w-full"
        placeholder="Subject..."
      />
    </div>
    <div class="flex flex-col items-start gap-3">
      <!-- <label for="" class="text-purple-800">Message</label> -->
      <textarea
        placeholder="Message here..."
        name=""
        id=""
        cols="30"
        rows="10"
        v-model="text"
        required
        class="bg-gray-100 border-0 outline-none rounded shadow focus:ring-0 w-full"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="bg-purple-800 hover:bg-purple-700 text-white duration-300 px-4 py-2 rounded shadow-md"
      >
        Send Message
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

const msg = ref(false);

const sender = ref("");
const subject = ref("");
const text = ref("");

const sendEmail = async () => {
  try {
    await axios
      .post("http://localhost:3000/BYAPI/v1/sendEmail", {
        sender: sender.value,
        subject: subject.value,
        text: text.value,
      })
      .then(() => {
        Swal.fire({
        icon: "success",
        title: `Sending Successfully!`,
      });
        sender.value = null,
        subject.value = null,
        text.value = null
      });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
