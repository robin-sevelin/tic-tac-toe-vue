<script setup lang="ts">
  import { ref } from 'vue';
  import { User } from '../Models/User';
  import AppForm from './AppForm.vue';
  import AppMainMenu from './AppMainMenu.vue';

  const users = ref<User[]>([new User('', 0, 'x'), new User('', 0, 'o')]);

  const nameUser = (x: string, o: string) => {
    users.value = users.value.map((user, index) => {
      if (index === 0 && user.id !== '') {
        return {
          ...user,
          name: x,
          isCreated: true,
        };
      } else if (index === 1 && user.id !== '') {
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
  <AppForm @submitUser="nameUser" v-if="!users.isCreated" />
  <AppMainMenu />
</template>

<style scoped></style>
