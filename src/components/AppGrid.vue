<script setup lang="ts">
  import { IDivProps } from '../Models/IDivProps';

  const props = defineProps<IDivProps>();

  const handleClick = () => {
    console.log('du klickade på, ' + props.div.id);
  };
</script>
<template>
  <div @click="handleClick" class="square">
    {{ props.div.id }}
  </div>
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
</style>
