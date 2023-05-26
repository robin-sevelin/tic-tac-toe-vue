<script setup lang="ts">
  defineProps<{ content: string }>();
</script>

<template>
  <main>
    <h2>{{ content }}</h2>
  </main>
</template>

<style scoped>
  main {
    max-width: 900px;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 100px;
  }
</style>
