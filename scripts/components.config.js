export const componentsConfig = {
  string: {
    component: 'VTextField',
  },
  number: {
    component: 'VTextField',
    props: {
      type: 'number',
      min: 0,
    },
  },
  boolean: 'VCheckbox',
  array: 'VSelect',
}
