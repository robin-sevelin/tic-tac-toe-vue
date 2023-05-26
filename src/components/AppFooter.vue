<script setup lang="ts">
  defineProps<{ content: string }>();
</script>

<template>
  <footer>
    <h2>{{ content }}</h2>
  </footer>
</template>

<style scoped>
  footer {
    height: 100px;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
</style>
