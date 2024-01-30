<script setup lang="ts">
  import type {ProductInterface} from '~/types/product'
  import {appCrudTableHeadersConst} from '~/constants/appCrudTableHeaders.const'

  const {data, pending, error} = useFetch<Array<ProductInterface>>(
    '/api/products',
    {
      default: () => [] as Array<ProductInterface>,
    },
  )
</script>

<template>
  <AppCrudTable
    title="Gestion des produits"
    :data="data"
    :headers="appCrudTableHeadersConst['products']"
    :loading="pending"
  />
</template>

<style scoped></style>
