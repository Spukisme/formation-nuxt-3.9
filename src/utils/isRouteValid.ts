import type {RouteLocation} from 'vue-router'
import {EDIT_MODES} from '~/constants/editMode.const'
import {MAKE_CRUD} from '~/constants/makeCrud.config'

export const isRouteValid = (route: RouteLocation) => {
  const {id, action, entity} = route.params as {
    id: string
    action: string
    entity: string
  }

  if (entity && !MAKE_CRUD.authorizedEntities.includes(entity)) {
    return false
  }
  switch (action) {
    case 'update':
      return (
        MAKE_CRUD.editMode !== EDIT_MODES.DIALOG && !!id && /^\d+$/.test(id)
      )
    case 'create':
      return MAKE_CRUD.editMode !== EDIT_MODES.DIALOG && id === ''
    default:
      return action === undefined && id === undefined
  }
}
