<script setup lang="ts" generic="T extends EntityInterface">
  import type {EntityInterface} from '~/types/entity'
  import type {KeyFromEntities} from '~/types/keyFromEntities'
  import {useFetchEntityStore} from '~/stores/fetchEntityStore'
  import {domains} from '~/domains'
  import {EDIT_MODES} from '~/constants/editMode.const'
  import {HTTP_METHODS} from '~/constants/httpMethods.const'
  import {MAKE_CRUD} from '~/constants/makeCrud.config'
  import type {EditDialogModel} from '~/types/editDialog'

  /** CONFIG **/
  const {entity} = useRoute().params as {entity: string}

  /** STORES **/
  const storeEntity = useFetchEntityStore<T>(
    domains[entity as KeyFromEntities].route,
  )
  const {data, pending, error} = storeToRefs(storeEntity)
  const {refreshData, forceRefresh} = storeEntity
  const {putMessage} = useSnackbar()

  /** REFS **/
  const dialog = ref<EditDialogModel<any>>({
    open: false,
    item: domains[entity as KeyFromEntities].defaultValueConst,
    subtitle: '',
  })

  /** COMPUTED **/
  /**  Permet de passer un réactif au useFetch()  **/
  const selectedItemComputed = computed(() => dialog.value.item)

  /**  Calcule la methode HTTP en fonction de la présence d'un id dans item **/
  const methodComputed = computed(() => {
    if (dialog.value.item && 'id' in dialog.value.item) {
      return HTTP_METHODS.PUT
    } else {
      return HTTP_METHODS.POST
    }
  })

  /**  Calcule l'apiPath en fonction de l'entité  et de l'id  **/
  const apiPathComputed = computed(
    () =>
      `api/${domains[entity as KeyFromEntities].route}${dialog.value.item && 'id' in dialog.value.item ? `/${dialog.value.item.id}` : ''}`,
  )

  /** FETCH **/
  const {execute, pending: pendingForm} = useFetch<T[]>(apiPathComputed, {
    method: methodComputed,
    immediate: false,
    watch: false,
    body: selectedItemComputed,
    onResponse({response}) {
      if (response.ok) {
        forceRefresh()
        putMessage(`${dialog.value.subtitle} effectuée`)
        dialog.value.open = false
      } else {
        putMessage('Une erreur est survenue', 'error')
      }
    },
  })

  /** LIFECYCLE **/
  onBeforeMount(() => {
    refreshData()
    //corrige le pending en immediate = false sur le fetch
    pendingForm.value = false
  })

  /** METHODS **/
  /**  Création en fonction du mode d'édition configuré  **/
  const handleCreate = () => {
    if (MAKE_CRUD.editMode === EDIT_MODES.DIALOG) {
      dialog.value.open = true
      dialog.value.subtitle = MAKE_CRUD.subtitle.create
      dialog.value.item = JSON.parse(
        JSON.stringify(domains[entity as KeyFromEntities].defaultValueConst),
      )
    } else useRouter().push(`/${entity}/${MAKE_CRUD.route.create}`)
  }
  /**
   * S'execute lorsque le model de dialog est mis à jour
   * @param value
   */
  const handleChangeModelValue = (value: EditDialogModel<T>) =>
    (dialog.value = value)
</script>

<template>
  <AppCrudTable
    :title="domains[entity as KeyFromEntities].titles.tableTitle"
    :data="data"
    :headers="domains[entity as KeyFromEntities].tableHeadersConst"
    :loading="pending"
    :error="error"
    @create="handleCreate"
  >
    <template
      v-for="template in domains[entity as KeyFromEntities]
        .dataTableTemplatesConst"
      :key="template.key"
      v-slot:[template.key]="props"
    >
      <component
        :is="template.component"
        v-bind="
          Object.assign(
            template.props ?? {},
            props,
            'target' in template && template.target
              ? {[template.target]: props.value}
              : {},
            template.key === 'actions' ? {modelValue: dialog} : {},
          )
        "
        v-on="
          Object.assign(
            'handlers' in template && template.handlers
              ? template.handlers
              : {},
            template.key === 'actions'
              ? {
                  'update:modelValue': handleChangeModelValue,
                }
              : {},
          )
        "
      />
    </template>
  </AppCrudTable>
  <VDialog
    v-model="dialog.open"
    width="40%"
    min-width="300px"
  >
    <AppFormLayout
      width="100%"
      :title="domains[entity as KeyFromEntities].titles.tableTitle"
      :subtitle="dialog.subtitle"
      :loading="pendingForm"
      @submit="execute"
      @cancel="dialog.open = false"
    >
      <component
        :is="domains[entity as KeyFromEntities].FormComponent"
        v-model="dialog.item"
      />
    </AppFormLayout>
  </VDialog>
</template>

<style scoped></style>
