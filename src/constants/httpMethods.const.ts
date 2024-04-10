import type {HTTPMethod} from '~/types/httpMethod'

export const HTTP_METHODS: {
  [key: string]: HTTPMethod
} = {
  POST: 'POST',
  GET: 'GET',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
}
