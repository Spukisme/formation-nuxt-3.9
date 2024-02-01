<script setup lang="ts">
  import type {ProductInterface} from '~/types/product'
  import {FORM_VALIDATIONS_RULES} from '~/constants/formValidationsRules.const'

  const product = defineModel<ProductInterface | Omit<ProductInterface, 'id'>>({
    required: true,
  })
</script>

<template>
  <v-text-field
    v-model="product.title"
    label="Title"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="product.description"
    label="Description"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model.number="product.price"
    label="Price"
    suffix="€"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model.number="product.discountPercentage"
    label="Discount Percentage"
    suffix="%"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model.number="product.rating"
    label="Rating"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model.number="product.stock"
    label="Stock"
    type="number"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="product.brand"
    label="Brand"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
  <v-text-field
    v-model="product.category"
    label="Category"
    :rules="[FORM_VALIDATIONS_RULES.required]"
  />
</template>

<style scoped></style>
