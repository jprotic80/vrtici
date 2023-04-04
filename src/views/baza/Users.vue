<template>
  <div class="users">
    <!-- BACKDROP KOMPONENTA -->

    <Backdrop v-if="backVis" @click.self="cancelDel">
      <div class="sadrzaj">
        <div class="pitanje"><p>Da li želite da obrišete korisnika?</p></div>
        <div class="odgovor">
          <button @click="obrisi">Da</button>
          <button @click="cancelDel">Ne</button>
        </div>
      </div>
    </Backdrop>
    <div class="user-container">
      <input type="text" placeholder="pretraga" v-model="pretraga" />
      <table>
        <thead>
          <tr>
            <th>Ime</th>
            <th v-if="mailVis">Email</th>
            <th>Privilegija</th>
            <th v-if="mailVis">Verifikovan</th>
            <th>Verifikuj</th>
            <th>Obriši</th>
          </tr>
        </thead>
        <transition-group tag="tbody" name="list">
          <tr v-for="user in filterUsers" :key="user.id">
            <td>{{ user.name }}</td>
            <td v-if="mailVis">{{ user.email }}</td>
            <td>{{ user.privilegy == 1 ? "administrator" : "trener" }}</td>
            <td v-if="mailVis" :class="{ neVer: !user.verified }">
              {{ user.verified ? "da" : "ne" }}
            </td>
            <td>
              <button v-if="!user.verified" @click="verifikuj(user.id)">
                Verifikuj
              </button>
            </td>
            <td>
              <button @click="potvrda(user.id)">obriši</button>
            </td>
          </tr>
        </transition-group>
      </table>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref } from "vue";
import Backdrop from "@/components/Backdrop.vue";
export default {
  components: { Backdrop },
  setup() {
    document.title = "users";

    const store = useStore();
    const backVis = ref(false);
    const deleteId = ref("");
    const mailVis = ref("true");

    const mobileMail = () => {
      if (window.innerWidth <= 805) {
        mailVis.value = false;
      } else {
        mailVis.value = true;
      }
    };

    mobileMail();

    window.addEventListener("resize", () => {
      mobileMail();
    });

    const users = computed(() => {
      return store.getters.getUsers;
    });
    const pretraga = ref("");

    const verifikuj = (id) => {
      store.dispatch("actVerify", { id });
    };

    const filterUsers = computed(() => {
      return users.value.filter((u) => {
        return u.name.toLowerCase().includes(pretraga.value.toLowerCase());
      });
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
      store.dispatch("actDeleteUser", { id: deleteId.value });
      cancelDel();
    };

    return {
      backVis,
      deleteId,
      filterUsers,
      verifikuj,
      pretraga,
      potvrda,
      cancelDel,
      obrisi,
      mailVis,
    };
  },
};
</script>

<style scoped>
.users {
  width: 100%;
  height: 100vh;
  padding: 80px 5% 10px 5%;
}
.user-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 20px;
}
table {
  max-width: 600px;
  border-collapse: collapse;
}
tbody {
  position: relative;
}
thead tr {
  background-color: #9f0e2d;
  color: #ebe4e4;
}
th {
  padding: 5px;
}
th:nth-of-type(1),
th:nth-of-type(2) {
  text-align: left;
}
td {
  padding: 5px;
}
td:nth-of-type(3),
td:nth-of-type(4) {
  text-align: center;
}
tbody tr {
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #fff;
}
tbody tr:nth-of-type(even) {
  background-color: rgb(211, 205, 205);
}
tbody tr:hover {
  background-color: #0e1621;
  color: #ebe4e4;
}
.neVer {
  background-color: red;
  color: #fff;
}
input {
  width: 250px;
  padding: 5px;
  background-color: #0e1621;
  color: #ebe4e4;
  border-radius: 4px;
  text-align: center;
  outline: none;
}
::placeholder {
  color: #ebe4e4;
  opacity: 1;
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
</style>
