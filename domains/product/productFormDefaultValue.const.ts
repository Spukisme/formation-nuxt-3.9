import type {ProductInterface} from '~/types/product'

export const productFormDefaultValueConst = {
  title: '',
  description: '',
  price: 0,
  discountPercentage: 0,
  rating: 0,
  stock: 0,
  brand: '',
  category: '',
} satisfies Omit<ProductInterface, 'id'>
