import { FilterOption } from './types'

const addRequiredAttributeToAll = (items: Array<FilterOption>) => {
  return items.map(i => ({
    ...i,
    attributes: {
      required: true
    }
  }))
}

export default addRequiredAttributeToAll