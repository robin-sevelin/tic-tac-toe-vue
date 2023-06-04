<script setup lang="ts">
  import AppForm from './AppForm.vue';
  import AppGame from './AppGame.vue';
  import { Player } from '../Models/Player';
  import { onMounted, ref } from 'vue';

  const hasTwoPlayers = ref(false);
  const players = ref<Player[]>([]);
  const emits = defineEmits(['players']);

  onMounted(() => {
    getGameBoardFromLocalStorage();
    if (!localStorage.getItem('gameBoard')) {
      checkPlayerCount(players.value);
    }
  });

  const getGameBoardFromLocalStorage = () => {
    const storedBoard = localStorage.getItem('gameBoard');
    if (storedBoard) {
      hasTwoPlayers.value = JSON.parse(storedBoard);
    }
  };

  const checkPlayerCount = (emittedPlayers: Player[]) => {
    if (emittedPlayers.length === 0) {
      return (hasTwoPlayers.value = false);
    }
    players.value = emittedPlayers;
    hasTwoPlayers.value = true;
    emits('players', players.value);
  };
</script>

<template>
  <main>
    <AppForm @players="checkPlayerCount" v-if="!hasTwoPlayers" />
    <AppGame :playerProps="players" @endGame="checkPlayerCount" v-else />
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
    top: 50px;
    margin-bottom: 100px;
    padding-bottom: 2rem;
  }
</style>
