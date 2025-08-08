import { FilterType } from '../../_filters/filter-input/enum'
import { FilterOption, FilterValue } from '../../_filters/types'

const sortByTemplate = (): FilterValue[] => {
  return [
    {
      text: 'Column',
      name: 'sortColumn',
      type: 'Radio' as FilterType,
      options: [] as FilterOption[],
      value: null,
      minimumLength: null,
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
      minimumLength: null,
      mandatory: true,
    },
  ]
}

export default {
  sortByTemplate,
}
