import { FilterType } from '../filter-input/enum'
import { FilterValue } from '../filter-input/types'

// TODO delete this one we get the proper filters from the definition
const establishmentFilter: FilterValue[] = [
  {
    text: 'Establishment ID',
    name: 'establishmentId',
    type: FilterType.select,
    options: [
      {
        value: 'no-filter',
        text: 'Select your option',
        disabled: true,
        selected: true,
      },
      {
        value: 'MDI',
        text: 'MDI',
      },
      {
        value: 'SLI',
        text: 'SLI',
      },
      {
        value: 'LTI',
        text: 'LTI',
      },
      {
        value: 'DAI',
        text: 'DAI',
      },
    ],
    value: null,
    minimumLength: null,
    dynamicResourceEndpoint: null,
    mandatory: true,
  },
]

export default establishmentFilter
