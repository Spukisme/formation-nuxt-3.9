<script setup lang="ts">
  import {productFormDefaultValueConst} from '~/domains/product/productFormDefaultValue.const'
  import FormProduct from '~/domains/product/FormProduct.vue'
  import {Methods} from '~/constants/httpMethods.const'

  const product = ref(JSON.parse(JSON.stringify(productFormDefaultValueConst)))

  const {pending, error, execute} = useFetch('/api/products', {
    method: Methods.POST,
    immediate: false,
    watch: false,
    body: product,
    onResponse({response}) {
      if (response.status === 201) {
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
    subtitle="Création"
    :submit="execute"
    :loading="pending"
  >
    <FormProduct v-model="product" />
  </AppFormLayout>
</template>

<style scoped></style>
