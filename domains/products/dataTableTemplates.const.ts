import AppCrudTableImg from '~/components/AppCrudTableImg.vue'

export const dataTableTemplatesConst = [
  {
    key: 'thumbnail',
    component: AppCrudTableImg,
    props: {
      maxWidth: '150px',
      maxHeight: '150px',
    },
  },
]
