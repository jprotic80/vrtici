<template>
  <div class="home">
    <form @submit.prevent="signUp">
      <div class="form-element">
        <label>User name</label>
        <input type="text" v-model="podaci.name" required />
      </div>
      <div class="form-element">
        <label>User e-mail</label>
        <input type="email" v-model="podaci.email" required />
      </div>
      <div class="form-element">
        <label>User password</label>
        <input type="password" v-model="podaci.pass" required />
      </div>
      <div class="form-element">
        <label>Confirm password</label>
        <input type="password" v-model="podaci.confirmPass" required />
      </div>
      <button>Sign up</button>
      <div>
        <p>Already have an account?</p>
        <p><router-link to="/">Log in</router-link> instead</p>
      </div>
    </form>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const podaci = reactive({
      confirmPass: "",
      name: "",
      email: "",
      pass: "",
    });
    const signUp = () => {
      if (podaci.confirmPass !== podaci.pass) {
        return store.commit("mutShowMessage", {
          statusCode: 401,
          message: "Lozinke moraju da se poklapaju",
        });
      }
      store.dispatch("actSignUp", podaci);
    };

    return {
      podaci,
      signUp,
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
p,
a {
  color: #ebe4e4;
}
</style>
