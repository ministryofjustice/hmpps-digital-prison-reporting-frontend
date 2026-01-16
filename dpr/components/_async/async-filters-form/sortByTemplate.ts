import { FilterType } from '../../_filters/filter-input/enum'
import { FilterOption, FilterValue } from '../../_filters/types'

export const sortByTemplate = (): FilterValue[] => {
  return [
    {
      text: 'Column',
      name: 'sortColumn',
      type: 'Radio' as FilterType,
      options: [] as FilterOption[],
      value: null,
      mandatory: true,
    },
    {
      text: 'Direction',
      name: 'sortedAsc',
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
      ] as FilterOption[],
      value: 'false',
      mandatory: true,
    },
  ]
}

export default {
  sortByTemplate,
}
