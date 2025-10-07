import nunjucks from 'nunjucks'
import nunjucksDate from 'nunjucks-date'
import { FilterOption } from './components/_filters/filter-input/types'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
  env.addFilter('json', stringifyJson)
  env.addFilter('capitaliseSentence', capitaliseSentence)
  // Namespace our own filters
  env.addFilter('dpr.findError', findError)
  nunjucksDate.setDefaultFormat('DD/MM/YYYY')
  nunjucksDate.install(env, 'dprDate')
}

const findError = (errs: { text: string; href: string }[] | undefined, errToFind: string) => {
  const error = errs?.find((err) => err.href.slice(1) === errToFind)?.text
  return error ? { text: error } : null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyJson = (jsonObj: any) => {
  return JSON.stringify(jsonObj, null, 2)
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
