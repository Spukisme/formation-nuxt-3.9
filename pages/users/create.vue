<script setup lang="ts">
  import {userFormDefaultValueConst} from '~/domains/user/userFormDefaultValue.const'
  import FormUser from '~/domains/user/FormUser.vue'

  const user = ref(JSON.parse(JSON.stringify(userFormDefaultValueConst)))
</script>

<template>
  <AppFormLayout
    title="Utilisateur"
    subtitle="Création"
  >
    <FormUser v-model="user" />
  </AppFormLayout>
</template>

<style scoped></style>
