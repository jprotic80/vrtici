<template>
  <aside v-if="menuVis" :class="`${is_expanded && 'is-expanded'}`">
    <div class="linkovi">
      <router-link to="/prezentacija">
        <div class="logo">
          <img src="@/assets/myLogo.png" alt="Logo" />
        </div>
      </router-link>
      <div class="menu-toggle-wrap">
        <div class="menu-toggle" @click="ToggleMenu">
          <span class="material-icons">keyboard_double_arrow_right</span>
        </div>
      </div>
      <router-link v-if="privilegy == 2" to="/new-trening"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          add_box </span
        ><span v-if="is_expanded">Novi trening</span></router-link
      >
      <router-link v-if="privilegy == 2" to="/pregled-treninga"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          sprint </span
        ><span v-if="is_expanded">Pregled treninga</span></router-link
      >

      <router-link to="/users" v-if="privilegy == 1"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          group </span
        ><span v-if="is_expanded">Korisnici</span></router-link
      >
      <router-link to="/obuke" v-if="privilegy == 1"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          check_circle </span
        ><span v-if="is_expanded">Obuke</span></router-link
      >
      <router-link to="/nov-vrtic" v-if="privilegy == 1"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          add_home </span
        ><span v-if="is_expanded">Nov vrtić</span></router-link
      >
      <router-link to="/vrtici" v-if="privilegy == 1"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          home </span
        ><span v-if="is_expanded">Vrtići</span></router-link
      >
      <router-link to="/nov-kurs" v-if="privilegy == 1"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          add_circle </span
        ><span v-if="is_expanded">Nov trening</span></router-link
      >
      <router-link to="/kursevi" v-if="privilegy == 1"
        ><span v-if="!is_expanded" class="material-symbols-outlined">
          sprint </span
        ><span v-if="is_expanded">Treninzi</span></router-link
      >
    </div>
    <div class="auth">
      <router-link v-if="!token" to="/">Log in</router-link>
      <router-link v-if="!token" to="/signup">Sign up</router-link>
      <button v-if="token" @click="logOut">Log out</button>
    </div>
  </aside>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const is_expanded = ref(false);
    const menuVis = ref(false);

    const sideNav = () => {
      if (window.innerWidth <= 805) {
        menuVis.value = true;
      } else {
        menuVis.value = false;
      }
    };

    sideNav();

    window.addEventListener("resize", () => {
      sideNav();
    });

    const ToggleMenu = () => {
      is_expanded.value = !is_expanded.value;
    };

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
      is_expanded,
      ToggleMenu,
      menuVis,
      token,
      privilegy,
      logOut,
    };
  },
};
</script>

<style scoped>
aside {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  flex-direction: column;
  background-color: #0e1621;
  color: #fff;
  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  transition: 0.2s ease-in-out;
}
.logo {
  margin-bottom: 1rem;
}
.logo img {
  width: 2rem;
  border: 1px solid #fff;
}
.is-expanded {
  width: 180px;
}
.is-expanded .material-icons {
  transform: rotate(180deg);
  transition: 0.2s ease-out;
}
.menu-toggle-wrap {
  top: -3rem;
}
.menu-toggle {
  cursor: pointer;
}
.linkovi {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 25px;
}
.auth {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin-top: 100px;
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
