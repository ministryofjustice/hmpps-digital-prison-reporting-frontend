// @ts-nocheck

// List
const listPageSummaries = require('./list/list_page-summaries')
const listTableSummaries = require('./list/list_table-summaries')
const listSummaries = require('./list/list_summaries')
const list = require('./list/list')

const listTemplates = [list, listSummaries, listPageSummaries, listTableSummaries]

// list-section
const listSection = require('./list-section/list-section')
const listSectionSummaries = require('./list-section/list-section_summaries')
const listSectionPageSummaries = require('./list-section/list-section_page-summaries')
const listSectionSectionSummaries = require('./list-section/list-section_section-summaries')
const listSectionTableSummaries = require('./list-section/list-section_table-summaries')

const listSectionTemplates = [
  listSection,
  listSectionSummaries,
  listSectionPageSummaries,
  listSectionSectionSummaries,
  listSectionTableSummaries,
]

// parent-child
const parentChild = require('./parent-child/parent-child')
const parentChildSection = require('./parent-child/parent-child-section')

const parentChildTemaplate = [parentChild, parentChildSection]

// summary-section
const summarySection = require('./summary-section/summary-section')

const summarySectionTemplates = [summarySection]

// summary
const summary = require('./summary/summary')
const summaryComplex = require('./summary/summaries-complex')

const summaryTemplates = [summary, summaryComplex]

// row-section
const rowSection = require('./row-section/row-section')
const rowSectionChild = require('./row-section/row-section-child')
const rowSectionChildMultiple = require('./row-section/row-section-child-multiple')
const rowSectionMultiple = require('./row-section/row-section_multiple-rows')

const rowSectionTemplates = [rowSection, rowSectionChild, rowSectionChildMultiple, rowSectionMultiple]

module.exports = [
  ...listTemplates,
  ...listSectionTemplates,
  ...parentChildTemaplate,
  ...summarySectionTemplates,
  ...summaryTemplates,
  ...rowSectionTemplates,
]
