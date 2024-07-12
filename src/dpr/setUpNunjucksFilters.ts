import nunjucks from 'nunjucks'
import nunjucksDate from 'nunjucks-date'
import addRequiredAttributeToAll from './components/filter-input/filters'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('addRequiredAttributeToAll', addRequiredAttributeToAll)
  nunjucksDate.setDefaultFormat('DD-MM-YYYY')
  nunjucksDate.install(env, 'date')
}

export default setUpNunjucksFilters
