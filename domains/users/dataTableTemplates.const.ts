import AppCrudTableImg from '~/components/AppCrudTableImg.vue'
import {VChip} from 'vuetify/components'
import type {DataTableTemplate} from '~/types/dataTableTemplate'

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
  },
]
