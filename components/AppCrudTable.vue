<script setup lang="ts" generic="T extends EntityInterface">
  import type {EntityInterface} from '~/types/entity'
  import type {ReadonlyHeaders} from '~/types/headers'
  import {
    defaultCreateItemFunction,
    defaultDeleteItemFunction,
    defaultEditItemFunction,
  } from '~/utils/appCrudTableDefaultFunctions'
  import {FetchError} from 'ofetch'

  interface Props {
    title: string | null
    headers?: ReadonlyHeaders
    data: Array<T>
    loading: boolean
    error?: FetchError | null
    createItemFunction?: Function
    editItemFunction?: Function
    deleteItemFunction?: Function
  }

  const props = withDefaults(defineProps<Props>(), {
    title: null,
    loading: false,
    error: null,
    createItemFunction: defaultCreateItemFunction,
    editItemFunction: defaultEditItemFunction,
    deleteItemFunction: defaultDeleteItemFunction,
  })

  const dialogDelete = ref(false)
  const dialogDeleteIsLoading = ref(false)
  const selectedItem = ref<T>()

  const keys = computed(() => {
    return (
      props.headers
        ?.map((header) => header.key)
        .filter((key) => key !== 'actions') || []
    )
  })

  /**
   * Ouvre la confirmation de suppression pour l'élément spécifié.
   *
   * @param item - L'élément à supprimer.
   * @return void
   */
  const openDialogDelete = (item: T) => {
    dialogDelete.value = true
    selectedItem.value = item
  }

  /**
   * Gère la validation de la suppression.
   */
  const handleValidateDelete = async () => {
    dialogDeleteIsLoading.value = true
    await props.deleteItemFunction(selectedItem.value as T)
    dialogDeleteIsLoading.value = false
    dialogDelete.value = false
  }
</script>

<template>
  <v-data-table
    :headers="headers"
    :items="data"
    :loading="loading"
    class="elevation-1"
    loading-text="Données en chargement..."
  >
    <template v-slot:top>
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
          @click="createItemFunction"
          :disabled="loading"
        >
          Ajouter
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:no-data>
      <AppCrudTableNoData :error="error" />
    </template>
    <template v-slot:item.actions="{item}">
      <v-icon
        size="small"
        class="me-2"
        @click="editItemFunction(item)"
        icon="mdi-pencil"
      />
      <v-icon
        size="small"
        @click="openDialogDelete(item)"
        icon="mdi-delete"
      />
    </template>
    <template
      v-for="key in keys"
      #[`item.${key}`]="props"
    >
      <slot
        :name="key"
        v-bind="props"
      >
        {{ props.value }}
      </slot>
    </template>
  </v-data-table>
  <app-crud-table-delete-dialog
    v-model="dialogDelete"
    :loading="dialogDeleteIsLoading"
    @validate="handleValidateDelete"
  />
</template>

<style scoped></style>
