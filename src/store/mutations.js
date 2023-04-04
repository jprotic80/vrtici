import router from "@/router";

export default {
  mutShowMessage(state, payload) {
    state.statusCode = payload.statusCode;
    state.message = payload.message;
  },
  mutHideMessage(state, payload) {
    state.statusCode = "";
    state.message = "";
  },
  mutLogIn(state, payload) {
    state.statusCode = payload.statusCode;
    state.message = payload.message;
    this.commit("mutHideLoader");
    if (payload.statusCode === 200) {
      window.localStorage.setItem("token", payload.token);
      window.localStorage.setItem("userId", payload.userId);
      window.localStorage.setItem("privilegy", payload.privilegy);

      state.token = window.localStorage.getItem("token");
      state.userId = window.localStorage.getItem("userId");
      state.privilegy = window.localStorage.getItem("privilegy");
    }

    if (payload.privilegy == 1) {
      router.push("/prezentacija");
    } else {
      router.push("/pregled-treninga");
    }
  },
  mutLogOut(state, payload) {
    this.commit("mutShowMessage", {
      statusCode: 300,
      message: "Izlogovali ste se",
    });

    window.localStorage.clear();
    state.token = window.localStorage.getItem("token");
    state.userId = window.localStorage.getItem("userId");
    state.privilegy = window.localStorage.getItem("privilegy");
    router.push("/");
  },
  mutGetCourses(state, payload) {
    state.courses = payload;
  },
  mutGetVrtici(state, payload) {
    state.vrtici = payload;
  },
  mutGetUsers(state, payload) {
    state.users = payload;
  },
  mutGetObuke(state, payload) {
    this.commit("mutHideLoader");
    state.obuke = payload;
  },
  mutShowLoader(state, payload) {
    state.loader = true;
  },
  mutHideLoader(state, payload) {
    state.loader = false;
  },
};
