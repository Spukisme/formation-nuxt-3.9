<script setup lang="ts">
  import {productFormDefaultValueConst} from '~/domains/product/productFormDefaultValue.const'
  import FormProduct from '~/domains/product/FormProduct.vue'

  const product = ref(JSON.parse(JSON.stringify(productFormDefaultValueConst)))
</script>

<template>
  <AppFormLayout
    title="Produit"
    subtitle="Création"
  >
    <FormProduct v-model="product" />
  </AppFormLayout>
</template>

<style scoped></style>
