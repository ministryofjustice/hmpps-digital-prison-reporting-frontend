import { FilterType } from '../../_filters/filter-input/enum'
import { FilterValue } from '../../_filters/types'

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
        ],
        value: 'true',
        minimumLength: null,
        mandatory: true,
      },
    ]
  },
}
