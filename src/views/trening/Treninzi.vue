<template>
  <div class="treninzi">
    <!-- BACKDROP KOMPONENTA -->

    <Backdrop v-if="backVis" @click.self="cancelDel">
      <div class="sadrzaj">
        <div class="pitanje"><p>Da li želite da obrišete obuku?</p></div>
        <div class="odgovor">
          <button @click="obrisi">Da</button>
          <button @click="cancelDel">Ne</button>
        </div>
      </div>
    </Backdrop>

    <!-- PRETRAGA PO PARAMETRIMA I PRIKAZ ZARADE -->
    <div class="prihod">
      <p>
        <span>Ostvaren prihod: </span>
        {{
          new Intl.NumberFormat("de-DE", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          }).format(zarada)
        }}
        RSD
      </p>
    </div>
    <div class="pretraga">
      <select v-model="vrticP" @change="resetPage">
        <option value="">vrtić</option>
        <option v-for="vrtic in vrtici" :key="vrtic" :value="vrtic">
          {{ vrtic }}
        </option>
      </select>
      <select v-model="kursP" @change="resetPage">
        <option value="">trening</option>
        <option v-for="kurs in kursevi" :key="kurs" :value="kurs">
          {{ kurs }}
        </option>
      </select>
      <select v-model="zavrsenoP" @change="resetPage">
        <option value="">---</option>
        <option value="1">završeno</option>
        <option value="0">u planu</option>
      </select>
      <input type="date" v-model="datePod" />
      <input type="date" v-model="datePdo" />
    </div>

    <!-- LISTA AKTIVNOSTI TRENERA -->

    <div class="trening">
      <transition-group tag="ul" name="list">
        <li v-for="o in pages[stranica - 1]" :key="o.id">
          <p>{{ o.vrtic }}</p>
          <p>{{ o.kurs }}</p>
          <p>{{ o.date }}</p>
          <p>{{ o.price }}</p>
          <p>{{ o.finished ? "zavrseno" : "u planu" }}</p>

          <button
            @click="zavrsi(o.id, o.finished)"
            :class="{ disabled: o.finished }"
          >
            završi
          </button>

          <button @click="potvrda(o.id)">obriši</button>
        </li>
      </transition-group>
    </div>

    <!-- PAGINACIJA STRANICA -->

    <div class="paginacija">
      <div v-if="pages.length > 0">
        <button :class="{ disabled: isFirst }" @click="goFirst">First</button>
        <button :class="{ disabled: isFirst }" @click="goBack">
          {{ prethodna }}
        </button>
        <p>{{ stranica }}</p>
        <button :class="{ disabled: isLast }" @click="goForward">
          {{ sledeca }}
        </button>
        <button :class="{ disabled: isLast }" @click="goLast">Last</button>
      </div>
      <div v-if="pages.length > 0">
        <small>Page {{ stranica }} of {{ brojStranica }}</small>
      </div>
      <small v-else>Nema rezultata</small>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import Backdrop from "@/components/Backdrop.vue";
import { paginacija } from "../../functions";
export default {
  components: { Backdrop },
  setup() {
    const store = useStore();

    const kursP = ref("");
    const vrticP = ref("");
    const zavrsenoP = ref("");
    const backVis = ref(false);
    const deleteId = ref("");
    const datePod = ref("");
    const datePdo = ref("");

    const obuke = computed(() => {
      return store.getters.getObuke;
    });

    const samoVrtici = computed(() => {
      const arr = obuke.value.map((o) => {
        return o.vrtic;
      });
      return arr;
    });

    const vrtici = computed(() => {
      return Array.from(new Set(samoVrtici.value));
    });

    const samoKursevi = computed(() => {
      const arr = obuke.value.map((o) => {
        return o.kurs;
      });
      return arr;
    });

    const kursevi = computed(() => {
      return Array.from(new Set(samoKursevi.value));
    });

    const filterObuke = computed(() => {
      const list = obuke.value.filter((o) => {
        return (
          (vrticP.value ? o.vrtic == vrticP.value : true) &&
          (kursP.value ? o.kurs == kursP.value : true) &&
          (zavrsenoP.value ? o.finished == zavrsenoP.value : true) &&
          (datePod.value ? o.date >= datePod.value : true) &&
          (datePdo.value ? o.date <= datePdo.value : true)
        );
      });
      return list;
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
      store.dispatch("actDeleteObuka", { id: deleteId.value });
      cancelDel();
    };

    const zavrsi = (id, finished) => {
      if (finished) {
        return;
      }
      store.dispatch("actZavrsiObuku", { id });
    };

    const zarada = computed(() => {
      const zbir = filterObuke.value.reduce((sum, item) => {
        return sum + parseFloat(item.price);
      }, 0);
      return zbir;
    });

    /*---------- PAGINACIJA ---------*/

    const stranica = ref(1);
    const poStranici = ref(7);

    const pages = computed(() => {
      return paginacija(filterObuke.value, poStranici.value);
    });

    const brojStranica = computed(() => {
      return pages.value.length;
    });

    const isFirst = computed(() => {
      if (stranica.value === 1) {
        return true;
      } else {
        return false;
      }
    });
    const isLast = computed(() => {
      if (stranica.value === brojStranica.value) {
        return true;
      } else {
        return false;
      }
    });

    const prethodna = computed(() => {
      if (stranica.value > 1) {
        return stranica.value - 1;
      } else {
        return "---";
      }
    });

    const sledeca = computed(() => {
      if (stranica.value < brojStranica.value) {
        return stranica.value + 1;
      } else {
        return "---";
      }
    });

    const goFirst = () => {
      if (stranica.value > 1) {
        stranica.value = 1;
      }
    };

    const goBack = () => {
      if (stranica.value > 1) {
        stranica.value--;
      }
    };

    const goForward = () => {
      if (stranica.value < brojStranica.value) {
        stranica.value++;
      }
    };

    const goLast = () => {
      if (stranica.value < brojStranica.value) {
        stranica.value = brojStranica.value;
      }
    };

    const resetPage = () => {
      stranica.value = 1;
    };

    return {
      obuke,
      vrtici,
      kursevi,
      kursP,
      vrticP,
      zavrsenoP,
      filterObuke,
      obrisi,
      potvrda,
      backVis,
      cancelDel,
      zavrsi,
      stranica,
      poStranici,
      pages,
      brojStranica,
      isFirst,
      isLast,
      prethodna,
      sledeca,
      goFirst,
      goBack,
      goForward,
      goLast,
      resetPage,
      zarada,
      datePod,
      datePdo,
    };
  },
};
</script>

<style scoped>
.treninzi {
  margin-top: 100px;
  min-height: 100vh;
  width: 100%;
  position: relative;
}
.trening {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.prihod {
  text-align: center;
  padding: 5px;
  background-color: #ebe4e4;
  width: 400px;
  margin: auto;
  border: 1px solid #0e1621;
}
span {
  font-weight: 600;
  font-size: 18px;
}
ul {
  width: 750px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  list-style-type: none;
  position: relative;
}
p {
  font-size: 14px;
}
li {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background-color: #0e1621;
  color: #ebe4e4;
  padding: 10px;
  margin: 0;
}
li p:nth-of-type(1) {
  width: 20%;
}
li p:nth-of-type(2),
li p:nth-of-type(3),
li p:nth-of-type(4),
li p:nth-of-type(5),
li p:nth-of-type(6),
li p:nth-of-type(7) {
  width: 12%;
}
select,
input {
  width: 150px;
  padding: 5px;
  background-color: #0e1621;
  color: #ebe4e4;
  border-radius: 4px;
  cursor: pointer;
}
input {
  text-align: center;
}
.pretraga {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 30px;
  margin-top: 20px;
}
.list-enter-from {
  opacity: 0;
  transform: scale(0.7);
}
.list-enter-to {
  opacity: 1;
  transform: scale(1);
}
.list-enter-active {
  transition: all 0.4s ease;
}
.list-leave-from {
  opacity: 1;
  transform: scale(1);
}
.list-leave-to {
  opacity: 0;
  transform: scale(0.7);
}
.list-leave-active {
  transition: all 0.4s ease;
  position: absolute;
}
.list-move {
  transition: all 0.3s ease;
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
.disabled {
  cursor: unset;
  background: transparent;
  border: none;
  color: rgb(138, 134, 134);
}
.paginacija {
  position: fixed;
  bottom: 20px;
  left: 0;
  height: 55px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
  padding-top: 27px;
  margin-top: 20px;
}
.paginacija div {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}
.paginacija button {
  width: 50px;
}
.paginacija p {
  margin: 0 10px;
}
</style>
