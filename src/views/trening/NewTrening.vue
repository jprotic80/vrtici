<template>
  <div class="home">
    <form @submit.prevent="submitData">
      <div class="form-element">
        <label>Naziv treninga</label>
        <select v-model="podaci.kursId">
          <option :value="c.id" v-for="c in courses" :key="c.id">
            {{ c.name }}
          </option>
        </select>
      </div>
      <div class="form-element">
        <label>Vrtić</label>
        <select v-model="podaci.vrticId">
          <option :value="v.id" v-for="v in vrtici" :key="v.id">
            {{ v.name }}
          </option>
        </select>
      </div>
      <div class="form-element">
        <label>Datum</label>
        <input type="date" v-model="podaci.date" />
      </div>

      <button>Ubaci trening</button>
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
    const courses = computed(() => {
      return store.getters.getCourses;
    });
    const vrtici = computed(() => {
      return store.getters.getVrtici;
    });
    const podaci = reactive({
      vrticId: "",
      kursId: "",
      date: "",
      finished: false,
    });
    const cena = computed(() => {
      const price = courses.value.filter((c) => {
        return c.id == podaci.kursId;
      });
      return price[0].price;
    });

    const submitData = () => {
      if (!podaci.kursId) {
        store.commit("mutShowMessage", {
          statusCode: 400,
          message: "Niste izabrali kurs",
        });
        return;
      }
      if (!podaci.vrticId) {
        store.commit("mutShowMessage", {
          statusCode: 400,
          message: "Niste izabrali vrtic",
        });
        return;
      }
      if (!podaci.date) {
        store.commit("mutShowMessage", {
          statusCode: 400,
          message: "Niste izabrali datum",
        });
        return;
      }
      podaci.price = cena.value;
      store.dispatch("actCreateTrening", podaci);
    };
    watch(statusCode, (newVal, oldVal) => {
      if (newVal == 201) {
        router.push("/pregled-treninga");
      }
    });

    return {
      podaci,
      submitData,
      courses,
      vrtici,
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
input,
select {
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
