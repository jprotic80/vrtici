<template>
  <div>
    <SideBar />
    <Navigation />
    <Loader v-if="loader" />
    <router-view v-slot="{ Component }">
      <transition name="route" appear mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
    <transition name="message" appear>
      <Message v-if="statusCode" />
    </transition>
  </div>
</template>

<script>
import Message from "@/components/Message.vue";
import SideBar from "@/components/SideBar.vue";
import Navigation from "@/components/Navigation.vue";
import Loader from "@/components/Loader.vue";
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  components: { Message, Navigation, Loader, SideBar },
  setup() {
    const store = useStore();
    const statusCode = computed(() => {
      return store.getters.getStatusCode;
    });

    const privilegy = computed(() => {
      return store.getters.getPrivilegy;
    });

    const loader = computed(() => {
      return store.getters.getLoader;
    });

    return {
      statusCode,
      privilegy,
      loader,
    };
  },
};
</script>

<style>
#app {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-image: url("@/assets/Background.jpg");
  background-position: center;
  background-size: cover;
}
.message-enter-from,
.message-leave-to {
  transform: translateY(150px);
}
.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}
.route-enter-from,
.route-leave-to {
  opacity: 0;
  transform: translateX(400px);
}
.route-enter-active,
.route-leave-active {
  transition: all 0.3s ease-out;
}
.nav-icon {
  padding: 10px;
  cursor: pointer;
}
.nav-icon img {
  height: 50px;
  width: 50px;
}
</style>
