<script setup lang="ts" generic="T">
  /**  CONFIG  **/
  const {EDIT_MODE} = useRuntimeConfig().public
  /**  PROPS  **/
  interface Props {
    item: T
    deleteItemFunction: (item: T) => Promise<void>
    entity: string
  }
  const props = defineProps<Props>()

  /**  EMITS  **/

  type Emits = {
    delete: [T]
    edit: [T]
  }
  const emit = defineEmits<Emits>()

  const dialog = defineModel<{
    open: boolean
    item: T | Omit<T, 'id'>
    subtitle: string
  }>()
  /**  REFS  **/
  const dialogDelete = ref(false)
  const dialogDeleteIsLoading = ref(false)

  /**  STORES  **/
  const {forceRefresh} = useFetchEntityStore(props.entity)

  /**  METHODS  **/
  const handleClickEdit = () => {
    if (EDIT_MODE === 'DIALOG') {
      dialog.value = {open: true, item: props.item, subtitle: 'Modification'}
    } else emit('edit', props.item)
  }
  /**
   * Ouvre la confirmation de suppression pour l'élément spécifié.
   *
   * @return void
   */
  const openDialogDelete = () => {
    dialogDelete.value = true
  }

  /**
   * Gère la validation de la suppression.
   */
  const handleValidateDelete = async () => {
    if (props.item) {
      dialogDeleteIsLoading.value = true
      props
        .deleteItemFunction(props.item)
        .then(() => {
          forceRefresh()
          dialogDelete.value = false
        })
        .catch()
        .finally(() => {
          dialogDeleteIsLoading.value = false
        })
    }
  }
</script>
<template>
  <div>
    <v-icon
      size="small"
      class="me-2"
      @click="handleClickEdit"
      icon="mdi-pencil"
    />
    <v-icon
      size="small"
      @click="openDialogDelete"
      icon="mdi-delete"
    />
    <app-crud-table-delete-dialog
      v-model="dialogDelete"
      :loading="dialogDeleteIsLoading"
      @validate="handleValidateDelete"
    />
  </div>
</template>
<style scoped></style>
