<template>
  <div class="syrup" :style="{ '--texture-color': syrupColor }"></div>
</template>

<script setup lang="ts">
interface Props {
  syrupColor: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.syrup {
  transform: translateY(400%);
  position: relative;
  width: 100%;
  height: 20%;
  animation: pour-tea 2s 1s forwards;
  z-index: 2;
  background: repeating-linear-gradient(
    45deg,
    var(--texture-color, #c6c6c6),
    var(--texture-color, #c6c6c6) 10px,
    rgba(225, 207, 149, 1) 10px,
    rgba(225, 207, 149, 1) 20px
  );
  transition: background 0.5s ease;
}
</style>