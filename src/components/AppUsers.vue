<script setup lang="ts">
  import { ref } from 'vue';
  import { User } from '../Models/User';
  import AppForm from './AppForm.vue';
  import AppGame from './AppGame.vue';
  import AppButtons from './AppButtons.vue';

  const users = ref<User[]>([new User('', 0, 1, 'x'), new User('', 0, 2, 'o')]);

  const nameUser = (x: string, o: string) => {
    users.value = users.value.map((user, index) => {
      if (index === 0 && user.icon !== '') {
        return {
          ...user,
          name: x,
          isCreated: true,
        };
      } else if (index === 1 && user.icon !== '') {
        return {
          ...user,
          name: o,
          isCreated: true,
        };
      } else {
        return user;
      }
    });
  };
</script>

<template>
  <AppForm @submitUser="nameUser" v-if="!users[0].isCreated" />
  <AppButtons v-else />
</template>

<style scoped></style>
