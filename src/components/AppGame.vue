<script setup lang="ts">
  import { ref } from 'vue';
  import { GameBoard } from '../Models/GameBoard';
  import { Player } from '../Models/Player';

  const divArray = ref<GameBoard[]>([]);

  const showScore = ref(false);

  for (let i = 0; i < 9; i++) {
    const div = new GameBoard(false, false, i);
    divArray.value.push(div);
  }

  // const clickDiv = (payload: number) => {
  //   divArray.value = divArray.value.map((div) => {
  //     if (div.id === payload) {
  //       return { ...div, isClicked: !div.isClicked };
  //     } else {
  //       return div;
  //     }
  //   });
  // };

  const toggleShowScore = () => {
    showScore.value = !showScore.value;
  };

  const handleClick = () => {};
</script>
<template>
  <div class="game" v-if="!showScore">
    <div class="div" v-for="div in divArray" @click="handleClick()">
      {{ div.id }}
    </div>
  </div>
  <div class="score" v-if="showScore">
    <h3>Här är dina poäng</h3>
  </div>

  <div class="button-container">
    <button @click="toggleShowScore">Check score history</button>
    <button>Continue game</button>
    <button>Restart game</button>
    <button>Restart game</button>
    <button>En game session</button>
  </div>
</template>

<style scoped>
  .score {
    height: 300px;
  }
  .button-container {
    padding: 2rem;
    display: flex;
    gap: 1rem;
  }

  button {
    width: 100px;
    height: 50px;
    font-size: 1rem;
  }

  button:hover {
    background-color: lightgray;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
  .game {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }
  .div {
    border: 1px solid black;
    width: 100px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
  }

  .div:hover {
    background-color: lightgray;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
</style>
