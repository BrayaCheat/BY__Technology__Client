<template>
  <div class="relative overflow-x-auto shadow sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right bg-white"
    >
      <thead
        class="text-xs uppercase bg-purple-800 text-white"
      >
        <tr>
          <th scope="col" class="px-6 py-3">Photo</th>
          <th scope="col" class="px-6 py-3">Title</th>
          <th scope="col" class="px-6 py-3">Article</th>
          <th scope="col" class="px-6 py-3">Type</th>
          <th scope="col" class="px-6 py-3">Author</th>
          <th scope="col" class="px-6 py-3">Create Date</th>
          <th scope="col" class="px-6 py-3">Operation</th>
        </tr>
      </thead>
      <tbody v-if="postData.length > 0">
        <tr
          v-for="item in paginationData"
          :key="item._id"
          class="bg-white border-b hover:bg-zinc-300 cursor-pointer"
        >
          <th
            scope="row"
            class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            <img
              :src="get_photo(item.photo)"
              alt="photoURL"
              class="w-52 h-36 rounded object-cover"
            />
          </th>
          <td class="px-6 py-4">{{ (item.title).slice(0,20) }}...</td>
          <td class="px-6 py-4">{{ (item.article).slice(0,30) }}...</td>
          <td class="px-6 py-4">{{ item.type }}</td>
          <td class="px-6 py-4">{{ authorName }}</td>
          <td class="px-6 py-4">
            {{ new Date(item.createdAt).toDateString() }}
          </td>
          <td class="px-6 py-4 my-20 flex items-center gap-6">
            <router-link 
            :to="{name: 'UpdatePost', params: {id: item._id}}"
              class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
              >Edit</router-link>
            >
            <button
              @click="onDeletePost(item._id)"
              class="font-medium text-red-600 dark:text-red-500 hover:underline"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <h1 class="py-9 ms-6 font-medium text-4xl">Not found!</h1>
      </tbody>

      
    </table>
    
  </div>
  <nav aria-label="Page navigation example">
        <ul class="flex items-center justify-center -space-x-px h-10 text-base mt-9">
          <!-- <li>
            <button
              @click="currentPage--"
              class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Previous</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </li> -->
          <li
            v-for="page in totalPages"
            :key="page"
            :class="{ active: currentPage === page }"
          >
            <button
              @click="changePage(page)"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              {{ page }}
            </button>
          </li>
          <!-- <li>
            <button
              @click="currentPage++"
              class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span class="sr-only">Next</span>
              <svg
                class="w-3 h-3 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </li> -->
        </ul>
      </nav>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";

const postData = ref([]);
const baseURL = "http://localhost:3000/BYAPI/v1/";
const base_photo_URL = "http://localhost:3000/uploads/";
const auth = getAuth();
const authorName = ref("");
const itemPerPage = 3;
const currentPage = ref(1);

const changePage = (page) => {
  currentPage.value = page;
};

const totalPages = computed(() => {
  try {
    return Math.ceil(postData.value.length / itemPerPage);
  } catch (error) {
    console.log(error);
  }
});

const paginationData = computed(() => {
  try {
    const startIndex = (currentPage.value - 1) * itemPerPage;
    const endIndex = startIndex + itemPerPage;
    return postData.value.slice(startIndex, endIndex);
  } catch (error) {
    console.log(error);
  }
});

const get__Admin = onMounted(async () => {
  try {
    auth.onAuthStateChanged((user) => {
      if (user) {
        authorName.value = user.displayName || user.email;
      } else {
        authorName.value = "Adminstrator";
      }
    });
  } catch (error) {
    console.log(error);
  }
});

onMounted(async () => {
  get__Admin();
  try {
    await axios
      .get(baseURL)
      .then((response) => (postData.value = response.data.data));
  } catch (error) {
    console.log(error);
  }
});

const get_photo = (photoName) => {
  return base_photo_URL + photoName;
};

const onDeletePost = async (id) => {
  try {
    await axios.delete(baseURL + id).then((response) => {
      Swal.fire({
        icon: "success",
        title: `${response.data.message}`,
      });
      setTimeout(() => {
        location.reload();
      }, 1000);
    });
  } catch (error) {
    console.log(error);
  }
};
</script>

<style scope>
    .active{
        font-weight: bold;
        text-decoration: unnderline;
    }
</style>
