<script setup lang="ts">
  // defineProps<{ content: string; vue: string; vite: string }>();
</script>

<template>
  <footer>
    <!-- <h2>{{ content }}</h2>
    <div class="img-container">
      <img :src="vue" alt="vue logo" height="75" />
      <img :src="vite" alt="vite logo" height="75" /> -->
    <!-- </div> -->
  </footer>
</template>

<style scoped>
  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    position: absolute;
    bottom: 0;
  }

  .img-container {
    display: flex;
    gap: 1rem;
    padding: 1rem;
    padding: 1rem;
  }
</style>
