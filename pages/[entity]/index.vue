<script setup lang="ts" generic="T extends EntityInterface">
  import {appCrudTableHeadersConst} from '~/constants/appCrudTableHeaders.const'
  import type {EntityInterface} from '~/types/entity'
  import {entityConfig} from '~/domains/entity.config'
  import type {KeyFromEntities} from '~/types/keyFromEntities'

  /** CONFIG **/
  const {entity} = useRoute().params

  /** FETCH **/
  const {data, pending, error, refresh} = useFetch<Array<T>>(`/api/${entity}`, {
    default: () => [] as Array<T>,
  })

  const handleDeleteItem = async (item: T) => {
    await useFetch(`/api/${entity}/${item.id}`, {
      method: 'DELETE',
      onResponse: ({response}) => {
        if (response.ok) {
          refresh()
        }
      },
    })
  }
</script>

<template>
  <AppCrudTable
    :title="`Gestion des ${entityConfig.titleEntity[entity as KeyFromEntities]}`"
    :data="data"
    :headers="appCrudTableHeadersConst[entity as KeyFromEntities]"
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
