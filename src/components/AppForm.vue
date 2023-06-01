<script setup lang="ts">
  import { ref } from 'vue';
  import { Player } from '../Models/Player';

  const playerX = ref('');
  const playerO = ref('');

  const players = ref<Player[]>([
    new Player('', '✗', 0, 0, false),
    new Player('', '⭕️', 1, 0, false),
  ]);

  const emits = defineEmits(['players']);

  const submitUser = () => {
    if (players.value[0].isCreated === false) {
      players.value[0].name = playerX.value;
      players.value[0].isCreated = true;
    } else {
      players.value[1].name = playerO.value;
      players.value[1].isCreated = true;
      emits('players', players.value);
    }
  };
</script>

<template>
  <form @submit.prevent="submitUser" class="form-container">
    <div class="input-container" v-if="players[0].isCreated === false">
      <label for="inputX">Name for player ✗</label>
      <input id="inputX" type="text" v-model="playerX" autofocus />
    </div>
    <div class="input-container" v-else>
      <label for="inputO">Name for player ⭕️</label>
      <input id="inputO" type="text" v-model="playerO" autofocus />
    </div>
    <button :disabled="!players[0].isCreated ? playerX === '' : playerO === ''">
      Done
    </button>
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
