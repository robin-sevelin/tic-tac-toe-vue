<script setup lang="ts">
  import AppHeader from './components/AppHeader.vue';
  import AppFooter from './components/AppFooter.vue';
  import AppUsers from './components/AppUsers.vue';
</script>

<template>
  <AppHeader content="Welcome to Tic Tac Toe" />
  <!-- <AppMain content="Hello from main" /> -->
  <AppUsers />
  <AppFooter content="Made with" vue="vue.svg" vite="vite.svg" />
</template>

<style scoped></style>
