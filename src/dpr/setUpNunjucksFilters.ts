import nunjucks from 'nunjucks'
import createUrlForParameters from './utils/urlHelper'
import FilterUtils from './components/filters/utils'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('createUrlForParameters', createUrlForParameters)
  env.addGlobal('getTodayIsoDate', FilterUtils.getTodayIsoDate)
}

export default setUpNunjucksFilters
