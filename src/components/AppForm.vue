<script setup lang="ts">
  import { ref } from 'vue';
  import { Player } from '../Models/Player';

  const playerNameX = ref('');
  const playerNameO = ref('');

  const playerX = ref<Player>(new Player('', '⭕️', 0, false));
  const playerO = ref<Player>(new Player('', '❎', 0, false));

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
      <label>Name for player ❎</label>
      <input type="text" v-model="playerNameX" />
    </div>
    <div class="button-container">
      <button :disabled="playerNameX === ''">Done</button>
    </div>
  </form>

  <form v-else class="form-container" @submit.prevent="submitUserO">
    <div class="input-container">
      <label>Name for player ⭕️</label>
      <input type="text" v-model="playerNameO" />
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

  button {
    height: 50px;
    width: 100px;
    font-size: 1rem;
    margin-top: 1rem;
    background-color: lightgreen;
    border-radius: 10px;
  }

  button:hover {
    cursor: pointer;
  }

  input {
    margin-left: 1rem;
  }

  form {
    max-width: 300px;
    margin: auto;
  }
</style>
