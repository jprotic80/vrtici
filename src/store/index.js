import { createStore, storeKey } from "vuex";
import actions from "./actions";
import mutations from "./mutations";
import getters from "./getters";
export default createStore({
  state: {
    token: window.localStorage.getItem("token"),
    userId: window.localStorage.getItem("userId"),
    privilegy: window.localStorage.getItem("privilegy"),
    statusCode: "",
    message: "",
    courses: [],
    vrtici: [],
    users: [],
    obuke: [],
    loader: false,
  },
  getters,
  mutations,
  actions,
  modules: {},
});
