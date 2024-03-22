import {VChip} from 'vuetify/components'
import type {DataTableTemplate} from '~/types/dataTableTemplate'
import {AppCrudTableActions, AppCrudTableImg} from '#components'
import type {EntityInterface} from '~/types/entity'
import {handleDeleteItem} from '~/utils/handleDeleteItem'
import type {UserInterface} from '~/types/user'

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
      deleteItemFunction: (item: UserInterface) =>
        handleDeleteItem(`/api/users/${item.id}`),
      entity: 'users',
    },
  },
]
