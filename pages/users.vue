<script setup lang="ts">
  import type {UserInterface} from '~/types/user'

  const {data, pending, error} = useFetch<Array<UserInterface>>(
    '/api/products',
    {
      default: () => [] as Array<UserInterface>,
    },
  )
</script>

<template>
  {{ data }}
</template>

<style scoped></style>
