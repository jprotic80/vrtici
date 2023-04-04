<template>
  <div class="home">
    <form @submit.prevent="submitData">
      <div class="form-element">
        <label>Name</label>
        <input type="text" v-model="podaci.name" required />
      </div>
      <div class="form-element">
        <label>Email</label>
        <input type="email" v-model="podaci.email" required />
      </div>
      <div class="form-element">
        <label>City</label>
        <input type="text" v-model="podaci.city" required />
      </div>
      <div class="form-element">
        <label>Address</label>
        <input type="text" v-model="podaci.address" required />
      </div>
      <div class="form-element">
        <label>Contact person</label>
        <input type="text" v-model="podaci.contactPerson" required />
      </div>
      <div class="form-element">
        <label>Phone</label>
        <input type="text" v-model="podaci.phone" required />
      </div>
      <button>Create</button>
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
      email: "",
      city: "",
      address: "",
      contactPerson: "",
      phone: "",
    });
    const submitData = () => {
      store.dispatch("actCreateVrtic", podaci);
    };
    watch(statusCode, (newVal, oldVal) => {
      if (newVal == 201) {
        router.push("/vrtici");
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
  gap: 10px;
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
