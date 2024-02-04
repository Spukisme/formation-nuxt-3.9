import type {EntityInterface} from '~/types/entity'

const BACK_PATH = 'http://localhost:5000'
// const TIME_BETWEEN_FETCH = 10000
export const useFetchEntityStore = <EntityType extends EntityInterface>(
  entity: string,
) =>
  defineStore(`${entity}-generic-store`, () => {
    /** Init Fetch refs for entity */
    const {data, refresh, pending, error} = useFetch<EntityType[]>(
      `/api/${entity}`,
      {
        default: () => [] as EntityType[],
        // onRequest(_context) {lastFetchTime.value = Date.now()},
        // onResponse(context) {if (!context.response.ok) lastFetchTime.value = 0},
      },
    )

    return {
      data,
      pending,
      refresh,
      error,
    }
  })()
