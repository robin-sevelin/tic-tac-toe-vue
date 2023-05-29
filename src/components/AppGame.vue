<script setup lang="ts">
  import { ref } from 'vue';
  import { Div } from '../Models/Div';
  import AppGrid from './AppGrid.vue';

  const divArray = ref<Div[]>([]);

  for (let i = 0; i < 9; i++) {
    const div = new Div(i + 1, false);
    divArray.value.push(div);
  }

  const clickDiv = (payload: number) => {
    console.log('du klickade på, ' + payload);

    divArray.value = divArray.value.map((div) => {
      if (div.id === payload) {
        return { ...div, isClicked: !div.isClicked };
      } else {
        return div;
      }
    });
  };
</script>

<template>
  <div class="game">
    <AppGrid
      @click="clickDiv"
      :div="div"
      v-for="div in divArray"
      :key="div.id"
    />
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
