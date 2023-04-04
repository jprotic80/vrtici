<template>
  <div class="backdrop">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.backdrop {
  position: fixed;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  z-index: 5;
}
.container {
  width: 300px;
  height: 150px;
  background-color: #0e1621;
  color: #fff;
}
</style>
