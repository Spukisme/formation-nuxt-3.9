import type {EntityInterface} from '~/types/entity'

export interface EditDialogModel<T extends EntityInterface> {
  open: boolean
  item: T | Omit<T, 'id'>
  subtitle: string
}
