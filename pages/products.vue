<script setup lang="ts">
  import type {ProductInterface} from '~/types/product'
  import AppBtn from '~/components/AppBtn.vue'

  const {data, pending, error} = useFetch<Array<ProductInterface>>(
    '/api/products',
    {
      default: () => [] as Array<ProductInterface>,
    },
  )
</script>

<template>
  {{ data }}
</template>

<style scoped></style>
