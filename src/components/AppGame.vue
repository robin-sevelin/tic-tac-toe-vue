<script setup lang="ts">
  import { Div } from '../Models/Div';
  import AppGrid from './AppGrid.vue';

  const divArray: Div[] = [];

  for (let i = 0; i < 9; i++) {
    const div = new Div(i);
    div.id = i + 1;
    divArray.push(div);
    console.log(divArray);
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
