<script setup lang="ts">
  import { ref } from 'vue';
  import { Div } from '../Models/Div';
  import AppGrid from './AppGrid.vue';

  const divArray: Div[] = [];
  const div = ref<Div>();

  for (let i = 0; i < 9; i++) {
    div.value = new Div(i + 1);
    divArray.push(div.value);
  }

  const handleClick = () => {
    console.log('du klickade på');
  };
</script>

<template>
  <div class="game">
    <AppGrid :div="div" v-for="div in divArray" :key="div.id" />
  </div>
</template>

<style scoped>
  .game {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
</style>
