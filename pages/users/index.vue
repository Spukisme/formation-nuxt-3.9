<script setup lang="ts">
  import type {UserInterface} from '~/types/user'
  import {appCrudTableHeadersConst} from '~/constants/appCrudTableHeaders.const'

  const {data, pending, error} = useFetch<Array<UserInterface>>('/api/users', {
    default: () => [] as Array<UserInterface>,
  })
</script>

<template>
  <AppCrudTable
    title="Gestion des utilisateurs"
    :data="data"
    :headers="appCrudTableHeadersConst['users']"
    :loading="pending"
    :error="error"
    :create-item-function="() => useRouter().push('/users/create')"
  />
</template>

<style scoped></style>
