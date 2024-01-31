<script setup lang="ts">
  import type {ProductInterface} from '~/types/product'
  import {appCrudTableHeadersConst} from '~/constants/appCrudTableHeaders.const'

  const {
    data: products,
    pending,
    error,
  } = useFetch<Array<ProductInterface>>('/api/products', {
    default: () => [] as Array<ProductInterface>,
  })
</script>

<template>
  <AppCrudTable
    title="Gestion des produits"
    :data="products"
    :headers="appCrudTableHeadersConst['products']"
    :loading="pending"
    :error="error"
    :create-item-function="() => useRouter().push('/products/create')"
  />
</template>

<style scoped></style>
