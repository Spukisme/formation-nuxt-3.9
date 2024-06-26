<script setup lang="ts" generic="T">
  /**  CONFIG  **/
  import {EDIT_MODES} from '~/constants/editMode.const'
  import {MAKE_CRUD} from '~/constants/makeCrud.config'

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
    if (MAKE_CRUD.editMode === EDIT_MODES.DIALOG) {
      dialog.value = {
        open: true,
        item: JSON.parse(JSON.stringify(props.item)),
        subtitle: 'Modification',
      }
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
