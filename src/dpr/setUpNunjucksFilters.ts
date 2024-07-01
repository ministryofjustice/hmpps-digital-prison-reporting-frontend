import nunjucks from 'nunjucks'
import createUrlForParameters from './utils/urlHelper'
import addRequiredAttributeToAll from './components/filter-input/filters'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('createUrlForParameters', createUrlForParameters)
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
}

export default setUpNunjucksFilters
