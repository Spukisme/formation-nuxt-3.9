<script setup lang="ts">
  import {productFormDefaultValueConst} from '~/domains/product/productFormDefaultValue.const'
  import FormProduct from '~/domains/product/FormProduct.vue'
  import {Methods} from '~/constants/httpMethods.const'
  import type {ProductInterface} from '~/types/product'

  const {id} = useRoute().params

  const {data, pending: productPending} = useFetch<
    ProductInterface | Omit<ProductInterface, 'id'>
  >(`/api/products/${id}`, {
    default: (): Omit<ProductInterface, 'id'> =>
      JSON.parse(JSON.stringify(productFormDefaultValueConst)) satisfies Omit<
        ProductInterface,
        'id'
      >,
  })

  const {pending, error, execute} = useFetch(`/api/products/${id}`, {
    method: Methods.PUT,
    immediate: false,
    watch: false,
    body: data,
    onResponse({response}) {
      if (response.ok) {
        useRouter().back()
      }
    },
  })

  /** Corrige le bug immediate false de useFetch **/
  onBeforeMount(() => {
    pending.value = false
  })
</script>

<template>
  <AppFormLayout
    width="60%"
    title="Produit"
    subtitle="Modification"
    :submit="execute"
    :loading="pending || productPending"
  >
    <FormProduct v-model="data" />
  </AppFormLayout>
</template>

<style scoped></style>
