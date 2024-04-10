import type {RouteLocation} from 'vue-router'
import {entities} from '~/constants/appRouteEntities'

export const isRouteValid = (route: RouteLocation) => {
  const {EDIT_MODE} = useRuntimeConfig().public

  const {id, action, entity} = route.params as {
    id: string
    action: string
    entity: string
  }

  if (entity && !entities.includes(entity)) {
    return false
  }
  switch (action) {
    case 'update':
      return EDIT_MODE !== 'DIALOG' && !!id && /^\d+$/.test(id)
    case 'create':
      return EDIT_MODE !== 'DIALOG' && id === ''
    default:
      return action === undefined && id === undefined
  }
}
