import nunjucks from 'nunjucks'
import createUrlForParameters from './utils/urlHelper'
import getTodayIsoDate from './components/filters/today'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('createUrlForParameters', createUrlForParameters)
  env.addGlobal('getTodayIsoDate', getTodayIsoDate)
}

export default setUpNunjucksFilters
