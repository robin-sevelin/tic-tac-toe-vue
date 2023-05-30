<script setup lang="ts">
  import AppForm from './AppForm.vue';
  import AppGame from './AppGame.vue';
  import { Player } from '../Models/Player';
  import { ref } from 'vue';

  const hasTwoPlayers = ref(false);

  const playerProps = defineProps({
    players: {
      type: Array as () => Player[],
      required: true,
    },
  });

  const emits = defineEmits(['players']);

  const checkPlayerCount = (players: Player[]) => {
    if (players.length === 2) {
      hasTwoPlayers.value = true;
      emits('players', players);
    }
  };
</script>

<template>
  <main>
    <AppForm @players="checkPlayerCount" v-if="!hasTwoPlayers" />
    <AppGame :players="playerProps" v-else />
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
