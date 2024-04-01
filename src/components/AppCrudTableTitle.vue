<script setup lang="ts">
  /**  PROPS  **/
  interface Props {
    title: string | null
    loading?: boolean
    addTitle?: string
  }

  withDefaults(defineProps<Props>(), {
    title: null,
    loading: false,
    addTitle: 'Ajouter',
  })

  /**  EMITS  **/
  type Emit = {
    create: []
  }

  const emit = defineEmits<Emit>()

  /**  METHODS  **/
  const handleCreate = () => {
    emit('create')
  }
</script>
<template>
  <v-toolbar
    flat
    v-if="title"
  >
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-divider
      class="mx-4"
      inset
      vertical
    />
    <v-spacer />
    <v-btn
      color="primary"
      @click="handleCreate"
      :disabled="loading"
      :text="addTitle"
    />
  </v-toolbar>
</template>
<style scoped></style>
