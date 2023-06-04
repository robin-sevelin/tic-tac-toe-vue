<script setup lang="ts">
  import { Div } from '../Models/Div';
  import { IDivProps } from '../Models/IDivProps';

  const props = defineProps<IDivProps>();
  const emits = defineEmits<{
    (e: 'tag', payload: Div): void;
  }>();

  const handleCLick = () => {
    emits('tag', props.divProps);
  };
</script>

<template>
  <div class="div" @click="handleCLick">
    {{ props.divProps.name }}
  </div>
</template>

<style scoped>
  .div {
    border: 1px solid black;
    width: 110px;
    height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 2rem;
    background-color: white;
  }

  .div:hover {
    background-color: lightgray;
    transition: 0.3s ease-in-out;
    cursor: pointer;
  }
</style>
