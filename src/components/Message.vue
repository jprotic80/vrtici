<template>
  <div class="message" @click="close">
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
  setup() {
    const store = useStore();
    const message = computed(() => {
      return store.getters.getMessage;
    });
    const interval = setInterval(() => {
      store.commit("mutHideMessage");
      clearInterval(interval);
    }, 5000);

    const close = () => {
      store.commit("mutHideMessage");
      clearInterval(interval);
    };
    return {
      close,
      message,
    };
  },
};
</script>

<style scoped>
.message {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 250px;
  height: 100px;
  background-color: #9f0e2d;
  color: #b1adad;
  box-shadow: 3px 5px 20px rgba(0, 0, 0, 0.5);
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
p {
  text-align: center;
  font-size: 14px;
}
.good {
  background-color: #458321;
}
</style>
