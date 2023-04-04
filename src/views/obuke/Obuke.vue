<template>
  <div class="obuke">
    <div class="container">
      <div class="lista">
        <div class="pretraga">
          <select v-model="userP" @change="resetPage">
            <option value="">ime</option>
            <option v-for="user in users" :key="user" :value="user">
              {{ user }}
            </option>
          </select>
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
          <input type="date" v-model="datePod" />
          <input type="date" v-model="datePdo" />
        </div>
        <transition-group tag="ul" name="list">
          <li v-for="o in pages[stranica - 1]" :key="o.id">
            <p>{{ o.name }}</p>
            <p>{{ o.vrtic }}</p>
            <p>{{ o.kurs }}</p>
            <p>{{ o.date }}</p>
            <p>
              {{
                new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(o.price)
              }}
            </p>
          </li>
        </transition-group>
      </div>
      <div class="finansije">
        <div class="grupa">
          <div class="prikaz">
            <p>Prihod</p>
            <p>
              {{
                new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(prihod)
              }}
            </p>
          </div>
          <div class="prikaz">
            <p>Plate</p>
            <p>
              {{
                new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(plate)
              }}
            </p>
          </div>
        </div>
        <div class="grupa">
          <div class="prikaz">
            <p>Zarada</p>
            <p>
              {{
                new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(zarada)
              }}
            </p>
          </div>
          <div class="prikaz">
            <p>Ostatak</p>
            <p>
              {{
                new Intl.NumberFormat("de-DE", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(ostatak)
              }}
            </p>
          </div>
        </div>
      </div>
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
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import { paginacija } from "../../functions";
export default {
  setup() {
    document.title = "obuke";
    const store = useStore();
    const kursP = ref("");
    const vrticP = ref("");
    const userP = ref("");
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
    const samoUsers = computed(() => {
      const arr = obuke.value.map((o) => {
        return o.name;
      });
      return arr;
    });

    const users = computed(() => {
      return Array.from(new Set(samoUsers.value));
    });

    const filterObuke = computed(() => {
      const list = obuke.value.filter((o) => {
        return (
          (vrticP.value ? o.vrtic == vrticP.value : true) &&
          (kursP.value ? o.kurs == kursP.value : true) &&
          (userP.value ? o.name == userP.value : true) &&
          (datePod.value ? o.date >= datePod.value : true) &&
          (datePdo.value ? o.date <= datePdo.value : true)
        );
      });
      return list;
    });

    const prihod = computed(() => {
      return filterObuke.value.reduce((sum, item) => {
        return sum + parseFloat(item.price);
      }, 0);
    });

    const plate = computed(() => {
      return filterObuke.value.length * 1000;
    });

    const zarada = computed(() => {
      return prihod.value / 3;
    });

    const ostatak = computed(() => {
      return prihod.value - plate.value - zarada.value;
    });

    /*---------- PAGINACIJA ---------*/

    const stranica = ref(1);
    const poStranici = ref(8);

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
      filterObuke,
      kursP,
      vrticP,
      userP,
      datePod,
      datePdo,
      vrtici,
      kursevi,
      users,
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
      prihod,
      plate,
      zarada,
      ostatak,
    };
  },
};
</script>

<style scoped>
.obuke {
  width: 100%;
  height: 100vh;
  padding-top: 80px;
}
.container {
  width: 100%;
  height: 100%;
  position: relative;
}
.lista {
  width: 100%;
  height: 66%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 15px;
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

ul {
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 5px;
  list-style-type: none;
  position: relative;
}
li {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #9f0e2d;
  color: #ebe4e4;
  transition: all 0.2s ease;
}

li:hover {
  background-color: #0e1621;
  color: #ebe4e4;
}

li p:nth-of-type(1),
li p:nth-of-type(2),
li p:nth-of-type(3) {
  width: 25%;
}
li p:nth-of-type(4),
li p:nth-of-type(5) {
  width: 12.5%;
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
.disabled {
  cursor: unset;
  background: transparent;
  border: none;
  color: rgb(138, 134, 134);
}
.paginacija {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  height: 75px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 7px;
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
  font-size: 13px;
}
.finansije {
  width: 100%;
  height: 80px;
  font-weight: 600;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
}
.grupa {
  height: 80px;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.prikaz {
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
}
.finansije,
.paginacija {
  background-color: #fff;
  width: 60%;
  border: 1px solid #0e1621;
}
</style>
