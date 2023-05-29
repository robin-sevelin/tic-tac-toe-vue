<script setup lang="ts">
  import { ref } from 'vue';

  const x = ref('');
  const o = ref('');

  const emits = defineEmits<{
    (e: 'submitUser', x: string, o: string): void;
  }>();

  // const props = defineProps<IUserProps>();

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
  <form @submit.prevent="submitInput">
    <label>Name for user X</label>
    <input type="text" v-model="x" />

    <label>Name for user O</label>
    <input type="text" v-model="o" />

    <button>Create</button>
  </form>
</template>

<style scoped>
  .form-container {
    max-width: 500px;
    border: 1px solid black;
    margin: auto;
    height: 300px;
    display: flex;
    flex-direction: column;
  }

  form {
    max-width: 300px;
    margin: auto;
  }
</style>
