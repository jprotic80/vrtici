<template>
  <nav v-if="navVis">
    <div class="linkovi">
      <router-link to="/prezentacija"
        ><img src="@/assets/myLogo.png" class="logo"
      /></router-link>
      <router-link v-if="privilegy == 2" to="/new-trening"
        >Novi trening</router-link
      >
      <router-link v-if="privilegy == 2" to="/pregled-treninga"
        >Pregled treninga</router-link
      >

      <router-link to="/users" v-if="privilegy == 1">Korisnici</router-link>
      <router-link to="/obuke" v-if="privilegy == 1">Obuke</router-link>
      <router-link to="/nov-vrtic" v-if="privilegy == 1">Nov vrtić</router-link>
      <router-link to="/vrtici" v-if="privilegy == 1">Vrtići</router-link>
      <router-link to="/nov-kurs" v-if="privilegy == 1"
        >Nov trening</router-link
      >
      <router-link to="/kursevi" v-if="privilegy == 1">Treninzi</router-link>
    </div>
    <div class="auth">
      <router-link v-if="!token" to="/">Log in</router-link>
      <router-link v-if="!token" to="/signup">Sign up</router-link>
      <button v-if="token" @click="logOut">Log out</button>
    </div>
  </nav>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const navVis = ref(true);

    const mainNav = () => {
      if (window.innerWidth <= 805) {
        navVis.value = false;
      } else {
        navVis.value = true;
      }
    };

    mainNav();

    window.addEventListener("resize", () => {
      mainNav();
    });

    const token = computed(() => {
      return store.getters.getToken;
    });

    const privilegy = computed(() => {
      return store.getters.getPrivilegy;
    });

    const logOut = () => {
      store.commit("mutLogOut");
    };

    return {
      logOut,
      token,
      privilegy,
      navVis,
    };
  },
};
</script>

<style scoped>
nav {
  width: 90%;
  height: 60px;
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #0e1621;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 30px;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.4);
  border-radius: 6px;
}
.linkovi {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
}
.logo {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  border: 3px solid #ebe4e4;
}
.auth {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
}
a {
  text-decoration: none;
  color: #fff;
}
a.router-link-exact-active {
  color: #f697ab;
}
p {
  color: #f697ab;
}
.noPrivilegy {
  color: rgb(105, 105, 105);
  cursor: unset;
}
</style>
