import type {HTTPMethod} from '~/types/method'

export const HTTP_METHODS: {
  [key: string]: HTTPMethod
} = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}
