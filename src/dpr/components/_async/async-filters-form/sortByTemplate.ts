import { FilterType } from '../../_filters/filter-input/enum'
import { FilterOption, FilterValue } from '../../_filters/types'

const sortByTemplate = () => {
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
          value: 'false',
          text: 'Ascending',
        },
        {
          value: 'true',
          text: 'Descending',
        },
      ] as FilterOption[],
      value: 'true',
      minimumLength: null,
      mandatory: true,
    },
  ] satisfies FilterValue[]
}

export default {
  sortByTemplate,
}
