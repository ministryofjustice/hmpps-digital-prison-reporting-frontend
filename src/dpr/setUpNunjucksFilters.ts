import nunjucks from 'nunjucks'
import nunjucksDate from 'nunjucks-date'
import addRequiredAttributeToAll from './components/_filters/filter-input/filters'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
  env.addFilter('json', stringifyJson)
  env.addFilter('capitaliseSentence', capitaliseSentence)
  nunjucksDate.setDefaultFormat('DD/MM/YYYY')
  nunjucksDate.install(env, 'date')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const stringifyJson = (jsonObj: any) => {
  return JSON.stringify(jsonObj)
}

const capitaliseSentence = (text: string) => {
  return text.charAt(0).toUpperCase() + text.substring(1).toLowerCase()
}

export default setUpNunjucksFilters
