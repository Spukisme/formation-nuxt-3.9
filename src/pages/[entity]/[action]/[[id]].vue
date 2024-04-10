<script setup lang="ts" generic="T extends EntityInterface">
  import {HTTP_METHODS} from '~/constants/httpMethods.const'
  import type {EntityInterface} from '~/types/entity'
  import type {KeyFromEntities} from '~/types/keyFromEntities'
  import {domains} from '~/domains'
  import {MAKE_CRUD} from '~/constants/makeCrud.config'

  /** CONFIG **/
  const {id, action, entity} = useRoute().params

  const route = domains[entity as KeyFromEntities].route

  const method =
    action === MAKE_CRUD.route.update ? HTTP_METHODS.PUT : HTTP_METHODS.POST

  const url =
    action === MAKE_CRUD.route.update ? `/api/${route}/${id}` : `/api/${route}`

  const subtitle =
    action === MAKE_CRUD.route.update
      ? MAKE_CRUD.subtitle.update
      : MAKE_CRUD.subtitle.create

  /** STORES **/
  const {putMessage} = useSnackbar()
  const {forceRefresh} = useFetchEntityStore<T>(route)

  /** FETCH **/
  /**
   * Permet de récupérer les données de l'utilisateur à modifier
   * Ou affecte la valeur par défaut pour une création
   */
  const {data, pending: pendingData} = useFetch<T | Omit<T, 'id'>>(
    `/api/${route}/${id}`,
    {
      immediate: action === MAKE_CRUD.route.update,
      watch: false,
      default: () =>
        JSON.parse(
          JSON.stringify(domains[entity as KeyFromEntities].defaultValueConst),
        ) satisfies Omit<T, 'id'>,
    },
  )

  /**
   * Permet de creer/modifier l'utilisateur
   */
  const {pending, execute} = useFetch(url, {
    method,
    immediate: false,
    watch: false,
    body: data,
    onResponse({response}) {
      if (response.ok) {
        forceRefresh()
        putMessage(`${subtitle} effectuée`)
        useRouter().push(`/${entity}`)
      } else {
        putMessage('Une erreur est survenue', 'error')
      }
    },
  })

  /** COMPUTED **/
  const loadingComputed = computed(() => pendingData.value || pending.value)

  /** HOOKS **/
  /** Corrige le bug immediate false de useFetch **/
  onBeforeMount(() => {
    pending.value = false
    if (action === MAKE_CRUD.route.create) {
      pendingData.value = false
    }
  })
</script>

<template>
  <AppFormLayout
    width="60%"
    :title="domains[entity as KeyFromEntities].titles.formTitle"
    :subtitle="subtitle"
    :loading="loadingComputed"
    @submit="execute"
    @cancel="useRouter().push(`/${entity}`)"
  >
    <component
      :is="domains[entity as KeyFromEntities].FormComponent"
      v-model="data"
    />
  </AppFormLayout>
</template>

<style scoped></style>
