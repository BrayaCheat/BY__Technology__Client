import { createRouter, createWebHistory } from "vue-router";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import Swal from "sweetalert2";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/Dashboard",
      name: "Dashboard",
      component: () => import("../views/Dashboard.vue"),
      meta: { requiresAuth: true }
    },
    {
      path: "/:catchAll(.*)",
      name: "NotFound",
      component: () => import("../views/NotFound.vue"),
    },
    {
      path: "/",
      name: "Home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/Login",
      name: 'Login',
      component: () => import('../views/Login.vue')
    },
    {
      path: "/UpdatePost/:id",
      name: 'UpdatePost',
      component: () => import('../views/UpdatePost.vue'),
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: "/Entertainment",
      name: 'Entertainment',
      component: () => import('../views/Entertainment.vue')
    },
    {
      path: "/Technology",
      name: 'Technology',
      component: () => import('../views/Technology.vue')
    },
    {
      path: "/Society",
      name: 'Society',
      component: () => import('../views/Society.vue')
    },
    {
      path: "/Sports",
      name: 'Sports',
      component: () => import('../views/Sports.vue')
    },
    {
      path: "/ViewDetail/:id",
      name: 'ViewDetail',
      component: () => import('../views/ViewDetail.vue'),
      props: true
    },
    {
      path: '/About',
      name: 'About',
      component: () => import('../views/About.vue')
    }
  ],
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject
    );
  });
};

router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (await getCurrentUser()) {
      next();
    } else {
      Swal.fire({
        icon: "error",
        title: "You don't have access!",
        text: `Please login with your account!`,
        footer: '<a href="#">Why do I have this issue?</a>',
      });
      next("/");
    }
  } else {
    next();
  }
});

export default router;
