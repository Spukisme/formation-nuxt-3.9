<script setup lang="ts" generic="T extends EntityInterface">
  import type {EntityInterface} from '~/types/entity'
  import type {KeyFromEntities} from '~/types/keyFromEntities'
  import {useFetchEntityStore} from '~/stores/fetchEntityStore'
  import {domains} from '~/domains'

  /** CONFIG **/
  const {entity} = useRoute().params as {entity: string}

  /** STORES **/
  const storeEntity = useFetchEntityStore<T>(entity)
  const {data, pending, error} = storeToRefs(storeEntity)
  const {refreshData, forceRefresh} = storeEntity

  const handleDeleteItem = async (item: T) => {
    await useFetch(`/api/${entity}/${item.id}`, {
      method: 'DELETE',
      onResponse: ({response}) => {
        if (response.ok) {
          forceRefresh()
        }
      },
    })
  }

  onBeforeMount(() => {
    refreshData()
  })
</script>

<template>
  <AppCrudTable
    :title="domains[entity as KeyFromEntities].titles.tableTitle"
    :data="data"
    :headers="domains[entity as KeyFromEntities].tableHeadersConst"
    :loading="pending"
    :error="error"
    :create-item-function="() => useRouter().push(`/${entity}/create`)"
    :edit-item-function="
      (item: T) => useRouter().push(`/${entity}/update/${item.id}`)
    "
    :delete-item-function="handleDeleteItem"
  />
</template>

<style scoped></style>
