<script setup lang="ts">
  import { IDivProps } from '../Models/IDivProps';

  const props = defineProps<IDivProps>();

  const emits = defineEmits<{
    (e: 'click', payload: number): void;
  }>();

  const handleClick = () => {
    emits('click', props.div.id);
  };
</script>
<template>
  <button
    :disabled="props.div.isClicked"
    @click="handleClick"
    class="square"
    :class="{ red: props.div.isClicked, blue: !props.div.isClicked }"
  ></button>
</template>

<style scoped>
  .square {
    border: 1px solid black;
    width: 100px;
    height: 100px;
  }

  .square:hover {
    cursor: pointer;
  }

  .blue {
    background-color: blue;
  }

  .red {
    background-color: red;
  }
</style>
