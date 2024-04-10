<script setup lang="ts" generic="T extends EntityInterface">
  import type {EntityInterface} from '~/types/entity'
  import type {KeyFromEntities} from '~/types/keyFromEntities'
  import {useFetchEntityStore} from '~/stores/fetchEntityStore'
  import {domains} from '~/domains'
  import {EDIT_MODES} from '~/constants/editMode.const'
  import {HTTP_METHODS} from '~/constants/httpMethods.const'
  import {MAKE_CRUD} from '~/constants/makeCrud.config'

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
  const openDialog = ref(false)
  const selectedItem = ref(domains[entity as KeyFromEntities].defaultValueConst)
  const subtitle = ref('')

  /** COMPUTED **/
  const dialogComputed = computed({
    get: () => ({
      open: openDialog.value,
      item: selectedItem.value,
      subtitle: subtitle.value,
    }),
    set: (value) => {
      openDialog.value = value.open
      selectedItem.value = value.item
      subtitle.value = value.subtitle
    },
  })

  const methodComputed = computed(() => {
    if (dialogComputed.value.item && 'id' in dialogComputed.value.item) {
      return HTTP_METHODS.PUT
    } else {
      return HTTP_METHODS.POST
    }
  })

  const apiPathComputed = computed(
    () =>
      `api/${domains[entity as KeyFromEntities].route}${dialogComputed.value.item && 'id' in dialogComputed.value.item ? `/${dialogComputed.value.item.id}` : ''}`,
  )

  /** FETCH **/
  const {execute, pending: pendingForm} = useFetch<T[]>(apiPathComputed, {
    method: methodComputed,
    immediate: false,
    watch: false,
    body: selectedItem,
    onResponse({response}) {
      if (response.ok) {
        forceRefresh()
        putMessage(`${subtitle.value} effectuée`)
        openDialog.value = false
      } else {
        putMessage('Une erreur est survenue', 'error')
      }
    },
  })

  /** LIFECYCLE **/
  onBeforeMount(() => {
    refreshData()
    pendingForm.value = false
  })

  /** METHODS **/
  const handleCreate = () => {
    if (MAKE_CRUD.editMode === EDIT_MODES.DIALOG) {
      openDialog.value = true
      subtitle.value = 'Création'
      selectedItem.value = domains[entity as KeyFromEntities].defaultValueConst
    } else useRouter().push(`/${entity}/create`)
  }
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
            template.key === 'actions' ? {modelValue: dialogComputed} : {},
          )
        "
        v-on="
          Object.assign(
            'handlers' in template && template.handlers
              ? template.handlers
              : {},
            template.key === 'actions'
              ? {
                  'update:modelValue': (value: any) => (dialogComputed = value),
                }
              : {},
          )
        "
      />
    </template>
  </AppCrudTable>
  <VDialog
    v-model="openDialog"
    width="40%"
    min-width="300px"
  >
    <AppFormLayout
      width="100%"
      :title="domains[entity as KeyFromEntities].titles.tableTitle"
      :subtitle="subtitle"
      :loading="pendingForm"
      @submit="execute"
      @cancel="openDialog = false"
    >
      <component
        :is="domains[entity as KeyFromEntities].FormComponent"
        v-model="selectedItem"
      />
    </AppFormLayout>
  </VDialog>
</template>

<style scoped></style>
