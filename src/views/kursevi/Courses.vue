<template>
  <div class="pregled-kurseva">
    <!-- BACKDROP KOMPONENTA -->

    <Backdrop v-if="backVis" @click.self="cancelDel">
      <div class="sadrzaj">
        <div class="pitanje"><p>Da li želite da obrišete kurs?</p></div>
        <div class="odgovor">
          <button @click="obrisi">Da</button>
          <button @click="cancelDel">Ne</button>
        </div>
      </div>
    </Backdrop>
    <ul>
      <li v-for="c in courses" :key="c.id">
        <p>{{ c.name }}</p>
        <p>
          {{
            new Intl.NumberFormat("de-DE", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(c.price)
          }}
        </p>
        <button @click="potvrda(c.id)">obriši</button>
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

    const courses = computed(() => {
      return store.getters.getCourses;
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
      store.dispatch("actDeleteKurs", { id: deleteId.value });
      cancelDel();
    };

    return {
      backVis,
      deleteId,
      courses,
      potvrda,
      cancelDel,
      obrisi,
    };
  },
};
</script>

<style scoped>
.pregled-kurseva {
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
  height: 80vh;
  overflow-y: scroll;
}
li {
  background-color: #0e1621;
  color: #ebe4e4;
}
li p {
  text-align: left;
}
li p:nth-of-type(1) {
  width: 30%;
}
li p:nth-of-type(2) {
  width: 30%;
  text-align: right;
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
