<script setup lang="ts">
  import { ref } from 'vue';
  import { IUserProps } from '../Models/IUserProps';

  const x = ref('');
  const o = ref('');

  const emits = defineEmits<{
    (e: 'submitUser', x: string, o: string): void;
  }>();

  const props = defineProps<IUserProps>();

  const submitInput = () => {
    if (x.value === '' || o.value === '') {
      alert('du måste fylla i båda namnen');
      return;
    }
    emits('submitUser', x.value, o.value);

    x.value = '';
    o.value = '';
  };
</script>

<template>
  <form @submit.prevent="submitInput" class="form-container">
    <div class="input-container">
      <label>Name for user X</label> <input type="text" v-model="x" />
    </div>

    <div class="input-container">
      <label>Name for user O</label> <input type="text" v-model="o" />
    </div>

    <div class="button-container">
      <button>Done</button>
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

  .input-container {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    justify-content: space-between;
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
