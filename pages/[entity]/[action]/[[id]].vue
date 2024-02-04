<script setup lang="ts" generic="T extends EntityInterface">
  import {Methods} from '~/constants/httpMethods.const'
  import type {EntityInterface} from '~/types/entity'
  import {entityConfig} from '~/domains/entity.config'
  import type {KeyFromEntities} from '~/types/keyFromEntities'

  /** CONFIG **/
  const {id, action, entity} = useRoute().params

  const method = action === 'update' ? Methods.PUT : Methods.POST
  const url =
    action === 'update'
      ? `/api/${entity}/${id}`
      : entity === 'user'
        ? '/api/register'
        : `/api/${entity}`
  const subtitle = action === 'update' ? 'Modification' : 'Création'

  /** STORES **/
  const {putMessage} = useSnackbar()

  /** FETCH **/
  /**
   * Permet de récupérer les données de l'utilisateur à modifier
   * Ou affecte la valeur par défaut pour une création
   */
  const {data, pending: pendingData} = useFetch<T | Omit<T, 'id'>>(
    `/api/${entity}/${id}`,
    {
      immediate: action === 'update',
      watch: false,
      default: () =>
        JSON.parse(
          JSON.stringify(entityConfig.defaultValues[entity as KeyFromEntities]),
        ) satisfies Omit<T, 'id'>,
    },
  )

  /**
   * Permet de creer/modifier l'utilisateur
   */
  const {pending, error, execute} = useFetch(url, {
    method,
    immediate: false,
    watch: false,
    body: data,
    onResponse({response}) {
      if (response.ok) {
        putMessage('Modification effectuée')
        useRouter().back()
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
    if (action === 'create') {
      pendingData.value = false
    }
  })
</script>

<template>
  <AppFormLayout
    width="60%"
    :title="entityConfig.title[entity as KeyFromEntities]"
    :subtitle="subtitle"
    :submit="execute"
    :loading="loadingComputed"
  >
    <component
      :is="entityConfig.formComponent[entity as KeyFromEntities]"
      v-model="data"
    />
  </AppFormLayout>
</template>

<style scoped></style>
