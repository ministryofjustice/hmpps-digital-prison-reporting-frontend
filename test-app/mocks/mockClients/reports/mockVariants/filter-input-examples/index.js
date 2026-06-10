// @ts-nocheck
const granularDateRange = require('./granularDateRange')
const relativeDateRange = require('./relativeDateRange')
const relativeDateRangeDefault = require('./relativeDateRangeWithDefaults')
const establishmentsAutocomplete = require('./establishmentsAutocomplete')
const { establishmentAutocomplete } = require('@networkMocks/report/mockVariants/filter-input-examples/autocomplete')
const establishmentsAutocompleteMulti = require('./establishmentsAutocompleteMulti')
const {
  establishmentAutoCompleteMulti,
} = require('@networkMocks/report/mockVariants/filter-input-examples/autocompleteMulti')

module.exports = [
  granularDateRange,
  relativeDateRange,
  relativeDateRangeDefault,
  establishmentsAutocomplete,
  establishmentsAutocompleteMulti,
]
