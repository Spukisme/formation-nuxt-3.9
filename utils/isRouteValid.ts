import type {RouteLocation} from 'vue-router'

export const isRouteValid = (route: RouteLocation) => {
  const {id, action} = route.params as {id: string; action: string}

  switch (action) {
    case 'update':
      return !!id && /^\d+$/.test(id)
    case 'create':
      return id === ''
    default:
      return false
  }
}
