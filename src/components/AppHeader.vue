<script setup lang="ts">
  defineProps<{ content: string; img: string }>();
</script>

<template>
  <header>
    <h1>{{ content }}</h1>
    <img :src="img" alt="tic tac toe img" width="100" />
  </header>
</template>

<style scoped>
  header {
    gap: 1rem;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
