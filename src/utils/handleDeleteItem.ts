import {$fetch} from 'ofetch'

/**
 * Function to delete a generic item
 * @param request
 */
export const handleDeleteItem = async (request: string) => {
  await $fetch(request, {
    method: 'DELETE',
  })
}
