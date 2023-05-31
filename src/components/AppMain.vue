<script setup lang="ts">
  import AppForm from './AppForm.vue';
  import AppGame from './AppGame.vue';
  import { Player } from '../Models/Player';
  import { ref } from 'vue';

  const hasTwoPlayers = ref(false);
  const players = ref<Player[]>([]);
  const emits = defineEmits(['players', 'playerProps']);

  // onMounted(() => {
  //   const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');

  //   if (storedUsers.length > 0) {
  //     checkPlayerCount(storedUsers);
  //   } else {
  //     hasTwoPlayers.value = false;
  //   }
  // });

  const checkPlayerCount = (emittedPlayers: Player[]) => {
    players.value = emittedPlayers;
    hasTwoPlayers.value = true;
    emits('players', players.value);
  };
</script>

<template>
  <main>
    <AppForm @players="checkPlayerCount" v-if="!hasTwoPlayers" />
    <AppGame :players="players" v-else />
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
    margin-bottom: 100px;
    padding-bottom: 2rem;
  }
</style>
