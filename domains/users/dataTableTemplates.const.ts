import {VChip} from 'vuetify/components'
import type {DataTableTemplate} from '~/types/dataTableTemplate'
import {AppCrudTableActions, AppCrudTableImg} from '#components'
import type {EntityInterface} from '~/types/entity'
import {$fetch} from 'ofetch'

const handleDeleteItem = async (item: EntityInterface) => {
  await $fetch(`/api/users/${item.id}`, {
    method: 'DELETE',
  })
}
export const dataTableTemplatesConst: Array<DataTableTemplate> = [
  {
    key: 'image',
    component: AppCrudTableImg,
    props: {
      maxWidth: '500px',
      mawHeight: '500px',
    },
  },
  {
    key: 'email',
    component: VChip,
    target: 'text',
    props: {
      closable: true,
    },
  },
  {
    key: 'lastName',
    component: VChip,
    target: 'text',
  },
  {
    key: 'actions',
    component: AppCrudTableActions,
    handlers: {
      edit: (item: EntityInterface) =>
        useRouter().push(`/users/update/${item.id}`),
    },
    props: {
      deleteItemFunction: handleDeleteItem,
    },
  },
]
