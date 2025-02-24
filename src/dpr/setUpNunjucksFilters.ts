import nunjucks from 'nunjucks'
import nunjucksDate from 'nunjucks-date'
import { FilterOption } from './components/_filters/filter-input/types'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
  env.addFilter('json', stringifyJson)
  env.addFilter('capitaliseSentence', capitaliseSentence)
  nunjucksDate.setDefaultFormat('DD/MM/YYYY')
  nunjucksDate.install(env, 'dprDate')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyJson = (jsonObj: any) => {
  return JSON.stringify(jsonObj)
}

const capitaliseSentence = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
}

const addRequiredAttributeToAll = (items: Array<FilterOption>) => {
  return items.map((i) => ({
    ...i,
    attributes: {
      required: true,
    },
  }))
}

export default setUpNunjucksFilters
