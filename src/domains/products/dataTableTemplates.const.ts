import {AppCrudTableActions} from '#components'
import {handleDeleteItem} from '~/utils/handleDeleteItem'
import type {ProductInterface} from '~/types/product'
import {VImg} from 'vuetify/components'
import {MAKE_CRUD} from '~/constants/makeCrud.config'

export const dataTableTemplatesConst = [
  {
    key: 'thumbnail',
    component: VImg,
    target: 'src',
    props: {
      maxWidth: '150px',
      maxHeight: '150px',
    },
  },
  {
    key: 'actions',
    component: AppCrudTableActions,
    handlers: {
      edit: (item: ProductInterface) =>
        useRouter().push(`/products/${MAKE_CRUD.route.update}/${item.id}`),
    },
    props: {
      deleteItemFunction: (item: ProductInterface) =>
        handleDeleteItem(`/api/products/${item.id}`),
      entity: 'products',
    },
  },
]
