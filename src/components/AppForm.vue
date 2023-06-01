<script setup lang="ts">
  import { ref } from 'vue';
  import { Player } from '../Models/Player';

  const playerNameX = ref('');
  const playerNameO = ref('');

  const playerX = ref<Player>(new Player('', '✗', 0, 0, false));
  const playerO = ref<Player>(new Player('', '⭕️', 1, 0, false));

  const players = ref<Player[]>([]);

  const emits = defineEmits(['players']);

  const submitUserX = () => {
    playerX.value.name = playerNameX.value;
    playerX.value.isCreated = true;
    players.value.push(playerX.value);
  };

  const submitUserO = () => {
    playerO.value.name = playerNameO.value;
    playerO.value.isCreated = true;
    players.value.push(playerO.value);

    emits('players', players.value);
  };
</script>

<template>
  <form
    v-if="playerX.isCreated === false"
    @submit.prevent="submitUserX"
    class="form-container"
  >
    <div class="input-container">
      <label for="inputX">Name for player ✗</label>
      <input id="inputX" type="text" v-model="playerNameX" autofocus />
    </div>
    <div class="button-container">
      <button :disabled="playerNameX === ''">Done</button>
    </div>
  </form>

  <form v-else class="form-container" @submit.prevent="submitUserO">
    <div class="input-container">
      <label for="inputO">Name for player ⭕️</label>
      <input id="inputO" type="text" v-model="playerNameO" autofocus />
    </div>

    <div class="button-container">
      <button :disabled="playerNameO === ''">Done</button>
    </div>
  </form>
</template>

<style scoped>
  .form-container {
    position: relative;
    margin: auto;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    margin-left: 1rem;
  }

  form {
    max-width: 300px;
    margin: auto;
  }
</style>
