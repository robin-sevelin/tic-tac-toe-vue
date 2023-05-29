<script setup lang="ts">
  import AppUsers from './AppUsers.vue';
</script>

<template>
  <main>
    <AppUsers />
  </main>
</template>

<style scoped>
  main {
    max-width: 900px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 100px;
  }
</style>
