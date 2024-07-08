import nunjucks from 'nunjucks'
import addRequiredAttributeToAll from './components/filter-input/filters'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
}

export default setUpNunjucksFilters
