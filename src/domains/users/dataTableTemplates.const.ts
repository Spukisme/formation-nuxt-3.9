import {VChip, VImg} from 'vuetify/components'
import type {DataTableTemplate} from '~/types/dataTableTemplate'
import {AppCrudTableActions} from '#components'
import {handleDeleteItem} from '~/utils/handleDeleteItem'
import type {UserInterface} from '~/types/user'
import {MAKE_CRUD} from '~/constants/makeCrud.config'

export const dataTableTemplatesConst: Array<DataTableTemplate> = [
  {
    key: 'image',
    component: VImg,
    target: 'src',
    props: {
      maxWidth: '500px',
      maxHeight: '500px',
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
    key: 'actions',
    component: AppCrudTableActions,
    handlers: {
      edit: (item: UserInterface) =>
        useRouter().push(`/utilisateurs/${MAKE_CRUD.route.update}/${item.id}`),
    },
    props: {
      deleteItemFunction: (item: UserInterface) =>
        handleDeleteItem(`/api/users/${item.id}`),
      entity: 'users',
    },
  },
]
