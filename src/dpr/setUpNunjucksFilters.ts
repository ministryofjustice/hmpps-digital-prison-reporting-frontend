import nunjucks from 'nunjucks'
import nunjucksDate from 'nunjucks-date'
import addRequiredAttributeToAll from './components/filter-input/filters'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
  env.addFilter('json', stringifyJson)
  nunjucksDate.setDefaultFormat('DD-MM-YYYY')
  nunjucksDate.install(env, 'date')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyJson = (jsonObj: any) => {
  return JSON.stringify(jsonObj)
}

export default setUpNunjucksFilters
