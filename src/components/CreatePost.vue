<template>
  <form
    @submit.prevent="onSubmitForm"
    enctype="multipart/form-data"
    method="post"
    class="p-9 font-medium text-lg bg-white shadow rounded flex flex-col gap-6"
  >
    <div class="flex flex-col gap-3">
      <label>Post Title</label>
      <input
        v-model="postData.title"
        type="text"
        required
        placeholder="Post title..."
        class="bg-gray-100 border-0 outline-none rounded shadow focus:ring-0"
      />
    </div>
    <div class="flex flex-col gap-3">
      <label>Post Article</label>
      <textarea
        v-model="postData.article"
        cols="30"
        rows="10"
        required
        placeholder="Post article..."
        class="bg-gray-100 border-0 outline-none rounded shadow focus:ring-0"
      ></textarea>
    </div>

    <div class="grid lg:grid-cols-2 grid-cols-1 gap-9 items-start">
      <div class="flex flex-col gap-3">
        <label>Upload Photo</label>

        <div class="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span class="font-semibold">Click to upload</span> or drag and
                drop
              </p>
              <p class="text-xs text-gray-500 dark:text-gray-400">
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
                required
              @change="handleFileChanged"
              id="dropzone-file"
              type="file"
              class="hidden"
            />
          </label>
        </div>
      </div>
      <div class="flex flex-col gap-3">
        <label>Category</label>
        <select
        required
        v-model="postData.type"
        class="bg-gray-100 border-0 outline-none rounded shadow focus:ring-0">
            <option disabled selected>Choose category</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Technology">Technology</option>
            <option value="Society">Life and Society</option>
            <option value="Sports">Sports</option>
        </select>
      </div>
    </div>
    <div class="flex items-center gap-3 justify-end">
      <button
        class="bg-red-600 hover:bg-red-700 text-white rounded shadow px-4 py-2"
      >
        Clear
      </button>
      <button
        type="submit"
        class="bg-green-600 hover:bg-green-700 text-white rounded shadow px-4 py-2"
      >
        Add Post
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "vue-router";

const postData = ref({
  title: "",
  article: "",
  //Note => this photo name will catch at backend side (in route => upload.file('photo'))
  photo: "",
  type: "",
});
const baseURL = "http://localhost:3000/BYAPI/v1/";
const router = useRouter();

const handleFileChanged = (e) => {
  postData.value.photo = e.target.files[0];
};

const onSubmitForm = async () => {
  try {
    const { title, article, photo, type } = postData.value;
    const fd = new FormData();
    fd.append("title", title);
    fd.append("article", article);
    fd.append("photo", photo);
    fd.append("type", type);

    console.log(postData.value);

    await axios.post(baseURL, fd).then((response) => {
      Swal.fire({
        icon: "success",
        title: `${response.data.message}`,
      });
      (postData.value.title = null),
        (postData.value.article = null),
        (postData.value.photo = null),
        (postData.value.type = null);
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style lang="scss" scoped></style>
