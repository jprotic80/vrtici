<template>
  <div class="home">
    <form @submit.prevent="submitData">
      <div class="form-element">
        <label>Name</label>
        <input type="text" v-model="podaci.name" required />
      </div>
      <div class="form-element">
        <label>Price</label>
        <input type="text" v-model="podaci.price" required />
      </div>
      <button>Create course</button>
    </form>
  </div>
</template>

<script>
import { ref, reactive, watch, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const statusCode = computed(() => {
      return store.getters.getStatusCode;
    });
    const podaci = reactive({
      name: "",
      price: "",
    });
    const submitData = () => {
      store.dispatch("actCreateCourse", podaci);
    };
    watch(statusCode, (newVal, oldVal) => {
      if (newVal == 201) {
        router.push("/kursevi");
      }
    });

    return {
      podaci,
      submitData,
    };
  },
};
</script>

<style scoped>
.home {
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
  gap: 30px;
  width: 300px;
  background-color: #0e1621;
  border-radius: 10px;
  box-shadow: 1px 3px 15px rgba(0, 0, 0, 0.5);
}
.form-element {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 5px;
}
label {
  color: #ebe4e4;
}
input {
  width: 100%;
  padding: 5px 10px;
  border: none;
  outline: none;
  background-color: #ebe4e4;
  border-radius: 5px;
}
button {
  padding: 5px 10px;
  border: 1px solid #ebe4e4;
  border-radius: 5px;
}
p,
a {
  color: #ebe4e4;
}
</style>
