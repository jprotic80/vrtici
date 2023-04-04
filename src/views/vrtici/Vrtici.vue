<template>
  <div class="pregled-vrtica">
    <!-- BACKDROP KOMPONENTA -->

    <Backdrop v-if="backVis" @click.self="cancelDel">
      <div class="sadrzaj">
        <div class="pitanje"><p>Da li želite da obrišete vrtić?</p></div>
        <div class="odgovor">
          <button @click="obrisi">Da</button>
          <button @click="cancelDel">Ne</button>
        </div>
      </div>
    </Backdrop>
    <ul>
      <li v-for="v in vrtici" :key="v.id">
        <p>{{ v.name }}</p>
        <p>{{ v.city }}</p>
        <button @click="potvrda(v.id)">obriši</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import Backdrop from "@/components/Backdrop.vue";

export default {
  components: { Backdrop },
  setup() {
    const store = useStore();
    const backVis = ref(false);
    const deleteId = ref("");

    const vrtici = computed(() => {
      return store.getters.getVrtici;
    });

    const potvrda = (id) => {
      deleteId.value = id;
      backVis.value = true;
    };

    const cancelDel = () => {
      deleteId.value = "";
      backVis.value = false;
    };

    const obrisi = () => {
      store.dispatch("actDeleteVrtic", { id: deleteId.value });
      cancelDel();
    };

    return {
      backVis,
      deleteId,
      vrtici,
      potvrda,
      cancelDel,
      obrisi,
    };
  },
};
</script>

<style scoped>
.pregled-vrtica {
  width: 100%;
  height: 100vh;
  padding-top: 120px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
ul {
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
}
li {
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #0e1621;
  color: #ebe4e4;
}
li p {
  text-align: left;
}
li p:nth-of-type(1) {
  width: 40%;
}
li p:nth-of-type(2) {
  width: 40%;
}
.sadrzaj {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
}
.pitanje,
.odgovor {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  width: 100%;
  height: 50%;
}
</style>
