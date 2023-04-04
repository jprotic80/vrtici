<template>
  <div class="baza">
    <div class="title">
      <h3>Umetničko-sportski centar</h3>
      <Title />
    </div>
    <div class="container">
      <div class="bubbles">
        <span style="--i: 11"></span>
        <span style="--i: 12"></span>
        <span style="--i: 24"></span>
        <span style="--i: 10"></span>
        <span style="--i: 14"></span>
        <span style="--i: 23"></span>
        <span style="--i: 18"></span>
        <span style="--i: 16"></span>
        <span style="--i: 19"></span>
        <span style="--i: 20"></span>
        <span style="--i: 22"></span>
        <span style="--i: 25"></span>
        <span style="--i: 18"></span>
        <span style="--i: 21"></span>
        <span style="--i: 15"></span>
        <span style="--i: 13"></span>
        <span style="--i: 26"></span>
        <span style="--i: 17"></span>
        <span style="--i: 13"></span>
        <span style="--i: 11"></span>
        <span style="--i: 11"></span>
        <span style="--i: 12"></span>
        <span style="--i: 24"></span>
        <span style="--i: 10"></span>
        <span style="--i: 14"></span>
        <span style="--i: 23"></span>
        <span style="--i: 18"></span>
        <span style="--i: 16"></span>
        <span style="--i: 19"></span>
        <span style="--i: 20"></span>
        <span style="--i: 22"></span>
        <span style="--i: 25"></span>
        <span style="--i: 18"></span>
        <span style="--i: 21"></span>
        <span style="--i: 15"></span>
        <span style="--i: 13"></span>
        <span style="--i: 26"></span>
        <span style="--i: 17"></span>
        <span style="--i: 13"></span>
        <span style="--i: 11"></span>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "@/components/baza/Title.vue";
export default {
  components: { Title },
};
</script>

<style scoped>
.baza {
  width: 100%;
  height: 100vh;
  padding-top: 170px;
  background: #243144;
}
h3 {
  text-align: center;
  color: #fff;
  font-size: 25px;
}
.title {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}
.container {
  position: relative;
  width: 100%;
  height: 100%;
}
.bubbles {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
.bubbles span {
  position: relative;
  width: 30px;
  height: 30px;
  background: #5ff1ce;
  margin: 0 4px;
  border-radius: 50%;
  box-shadow: 0 0 0 10px #4fc3dc44, 0 0 50px #5ff1ce, 0 0 100px #5ff1ce;
  animation: animate 15s linear infinite;
  animation-duration: calc(125s / var(--i));
}
.bubbles span:nth-child(even) {
  background: #ff2d75;
  box-shadow: 0 0 0 10px #ff2d7544, 0 0 50px #ff2d75, 0 0 100px #ff2d75;
}
@keyframes animate {
  0% {
    transform: translateY(100vh) scale(0);
  }
  100% {
    transform: translateY(-10vh) scale(1);
  }
}
</style>
