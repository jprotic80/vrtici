import { createRouter, createWebHistory } from "vue-router";
import store from "@/store";
import HomeView from "../views/HomeView.vue";
import SignUp from "../views/SignUp.vue";
import Prezentacija from "../views/Prezentacija.vue";
import Users from "../views/baza/Users.vue";
import NewCourse from "@/views/kursevi/NewCourse.vue";
import Courses from "@/views/kursevi/Courses.vue";
import NewVrtic from "@/views/vrtici/NewVrtic.vue";
import Vrtici from "@/views/vrtici/Vrtici.vue";
import NewTrening from "@/views/trening/NewTrening.vue";
import Treninzi from "@/views/trening/Treninzi.vue";
import Obuke from "@/views/obuke/Obuke.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/prezentacija",
    name: "prezentacija",
    component: Prezentacija,
    meta: {
      auth: true,
    },
  },
  {
    path: "/obuke",
    name: "obuke",
    component: Obuke,
    meta: {
      auth: true,
      privilegy: 1,
    },
    beforeEnter: async (to, from, next) => {
      await store.dispatch("actGetSveObuke");
      next();
    },
  },
  {
    path: "/new-trening",
    name: "new-trening",
    component: NewTrening,
    meta: {
      auth: true,
      privilegy: 2,
    },
    beforeEnter: async (to, from, next) => {
      await store.dispatch("actGetCourses");
      await store.dispatch("actGetVrtici");
      next();
    },
  },
  {
    path: "/pregled-treninga",
    name: "pregled-treninga",
    component: Treninzi,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("actGetObuke");
      next();
    },
    meta: {
      auth: true,
    },
  },
  {
    path: "/users",
    name: "users",
    component: Users,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("actGetUsers");
      next();
    },
    meta: {
      auth: true,
      privilegy: 1,
    },
  },
  {
    path: "/signup",
    name: "signup",
    component: SignUp,
  },
  {
    path: "/nov-kurs",
    name: "nov-kurs",
    component: NewCourse,
    meta: {
      auth: true,
      privilegy: 1,
    },
  },
  {
    path: "/nov-vrtic",
    name: "nov-vrtic",
    component: NewVrtic,
    meta: {
      auth: true,
      privilegy: 1,
    },
  },
  {
    path: "/kursevi",
    name: "kursevi",
    component: Courses,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("actGetCourses");
      next();
    },
    meta: {
      auth: true,
    },
  },
  {
    path: "/vrtici",
    name: "vrtici",
    component: Vrtici,
    beforeEnter: async (to, from, next) => {
      await store.dispatch("actGetVrtici");
      next();
    },
    meta: {
      auth: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = store.getters.getToken;
  const privilegy = store.getters.getPrivilegy;
  const noPrivilegy = from.fullPath;
  if (to.meta.auth && !token) {
    router.push("/");
    store.commit("mutShowMessage", {
      statusCode: 401,
      message: "Niste ulogovani",
    });
  } else if (to.meta.privilegy && to.meta.privilegy != privilegy) {
    router.push(noPrivilegy);
    store.commit("mutShowMessage", {
      statusCode: 401,
      message: "Niste autorizovani",
    });
  } else {
    next();
  }
});

export default router;
