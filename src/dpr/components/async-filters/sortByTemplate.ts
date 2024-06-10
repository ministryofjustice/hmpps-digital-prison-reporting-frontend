import { FilterType } from '../filters/enum'
import { FilterValue } from '../filters/types'

export default {
  sortByTemplate: (): FilterValue[] => {
    return [
      {
        text: 'Column',
        name: 'sortColumn',
        type: 'Radio' as FilterType,
        options: [],
        value: null,
        minimumLength: null,
      },
      {
        text: 'Direction',
        name: 'sortAsc',
        type: 'Radio' as FilterType,
        options: [
          {
            value: 'true',
            text: 'Ascending',
          },
          {
            value: 'false',
            text: 'Descending',
          },
        ],
        value: 'true',
        minimumLength: null,
      },
    ]
  },
}
