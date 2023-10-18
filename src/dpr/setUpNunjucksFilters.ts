import nunjucks from 'nunjucks'
import createUrlForParameters from './utils/urlHelper'

const setUpNunjucksFilters = (env: nunjucks.Environment) => {
  env.addFilter('createUrlForParameters', createUrlForParameters)
}

export default setUpNunjucksFilters
