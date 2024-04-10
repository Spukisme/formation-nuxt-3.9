import {domains} from '~/domains'
import {EDIT_MODES} from '~/constants/editMode.const'

export const MAKE_CRUD = {
  editMode: EDIT_MODES.DIALOG,
  route: {
    create: 'create',
    update: 'update',
    view: 'view',
  },
  subtitle: {
    list: 'Liste',
    create: 'Ajouter',
    update: 'Modifier',
    view: 'Voir',
  },
  authorizedEntities: Object.keys(domains),
}
