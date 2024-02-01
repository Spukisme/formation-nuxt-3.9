import FormUser from '~/domains/user/FormUser.vue'
import FormProduct from '~/domains/product/FormProduct.vue'
import {productFormDefaultValueConst} from '~/domains/product/productFormDefaultValue.const'
import {userFormDefaultValueConst} from '~/domains/user/userFormDefaultValue.const'

export const entityConfig = {
  formComponent: {
    users: FormUser,
    products: FormProduct,
  },
  defaultValues: {
    users: userFormDefaultValueConst,
    products: productFormDefaultValueConst,
  },
  title: {
    users: 'Utilisateur',
    products: 'Produit',
  },
  titleEntity: {
    users: 'utilisateurs',
    products: 'produits',
  },
}
