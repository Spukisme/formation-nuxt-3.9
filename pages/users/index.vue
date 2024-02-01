<script setup lang="ts">
  import type {UserInterface} from '~/types/user'
  import {appCrudTableHeadersConst} from '~/constants/appCrudTableHeaders.const'

  const {data, pending, error, refresh} = useFetch<Array<UserInterface>>(
    '/api/users',
    {
      default: () => [] as Array<UserInterface>,
    },
  )

  const handleDeleteUser = async (user: UserInterface) => {
    await useFetch(`/api/users/${user.id}`, {
      method: 'DELETE',
      onResponse: ({response}) => {
        if (response.ok) {
          refresh()
        }
      },
    })
  }
</script>

<template>
  <AppCrudTable
    title="Gestion des utilisateurs"
    :data="data"
    :headers="appCrudTableHeadersConst['users']"
    :loading="pending"
    :error="error"
    :create-item-function="() => useRouter().push('/users/create')"
    :edit-item-function="
      (user: UserInterface) => useRouter().push(`/users/update/${user.id}`)
    "
    :delete-item-function="handleDeleteUser"
  />
</template>

<style scoped></style>
