import { SummaryTemplate } from '../../types/Templates'
import { AsyncSummary } from '../../types/UserReports'
import { components } from '../../types/api'
import { getFieldsByName, getFieldDisplayName } from '../definitionUtils'
import { SectionData, SectionedData } from './types'

class SectionedDataBuilder {
  sections: Array<string> = []

  data: Array<Record<string, string>> = []

  fields: components['schemas']['FieldDefinition'][] = []

  summariesData: AsyncSummary[] = []

  /**
   * Groups the data into sections
   *
   * @return {*}  {SectionedData}
   * @memberof SectionedDataBuilder
   */
  groupBySections(
    data: Array<Record<string, string>>,
    fields: components['schemas']['FieldDefinition'][] | components['schemas']['SummaryField'][],
    summary?: {
      template: SummaryTemplate
      id: string
    },
  ): SectionedData {
    const sectionMap = data.reduce<Record<string, SectionData>>((acc, row) => {
      // Build structured entries with column names + values
      const keyObj = this.sections.map((col) => ({
        name: col,
        value: row[col] ?? '',
      }))

      // Safe, collision-proof key
      const key = JSON.stringify(keyObj)

      // Human-readable display label
      const title = keyObj
        .map((column) => {
          const fieldName = getFieldDisplayName(fields, column.name)
          return `${fieldName}: ${column.value}`
        })
        .join(', ')

      // Create the section if needed
      if (!acc[key]) {
        acc[key] = {
          title,
          count: 0,
          key,
          summaries: [],
          data: <Array<Record<string, string>>>[],
        }
      }

      const section = acc[key]

      if (summary) {
        const { id, template } = summary
        const existingSummary = section.summaries.find((s) => s.template === template)
        if (existingSummary) {
          existingSummary.data.push(row)
        } else {
          section.summaries.push({
            id,
            template,
            fields,
            data: [row],
          })
        }
      } else {
        section.data.push(row)
        section.count += 1
      }

      return acc
    }, {})

    return {
      sections: Object.values(sectionMap),
    }
  }

  createSummarySections(): SectionedData[] {
    const summarySections: SectionedData[] = []
    this.summariesData.forEach((summaryData) => {
      const { fields, id, template, data } = summaryData
      const summarySection = this.groupBySections(<Array<Record<string, string>>>data, fields, { id, template })
      summarySections.push(summarySection)
    })
    return summarySections
  }

  mergeSectionSummaries(target: SectionedData, sources: SectionedData[]): SectionedData {
    // Build a lookup: key -> all summaries from all sources
    const summariesByKey = sources
      .flatMap((s) => s.sections)
      .filter((section) => !!section.key)
      .reduce<Record<string, AsyncSummary[]>>((acc, section) => {
        const key = section.key as string

        // Normalize undefined summaries to an empty array
        const srcSummaries = section.summaries ?? []

        // Deep copy summaries to avoid reference sharing
        const copiedSummaries = srcSummaries.map((s) => s)

        acc[key] = (acc[key] ?? []).concat(copiedSummaries)
        return acc
      }, {})

    // Append summaries to target summaries when the keys match
    const mergedSections = target.sections.map((section) => {
      if (!section.key) return section

      const incomingSummaries = summariesByKey[section.key]
      if (!incomingSummaries) {
        return section // no matching source summaries
      }

      return {
        ...section,
        summaries: [...(section.summaries ?? []), ...incomingSummaries],
      }
    })

    return { sections: mergedSections }
  }

  withSections(sections: string[]) {
    console.log(sections)
    this.sections = sections
    return this
  }

  withFields(fields: components['schemas']['FieldDefinition'][]) {
    console.log('____>', this.sections)
    this.fields = getFieldsByName(this.sections, fields)
    return this
  }

  withData(data: Array<Record<string, string>>) {
    this.data = data
    return this
  }

  withSummaries(summaryData: Array<AsyncSummary>) {
    this.summariesData = summaryData
    return this
  }

  build(): SectionedData {
    let sections: SectionedData
    if (this.sections.length) {
      // Split the parent data into sections
      const parentSections = this.groupBySections(this.data, this.fields)
      // If any summaries, split these into sections
      const summarySections = this.createSummarySections()
      // Merget the sections
      sections = this.mergeSectionSummaries(parentSections, summarySections)
    } else {
      const singleSection: SectionData = { data: this.data, count: this.data.length, summaries: this.summariesData }
      sections = { sections: [singleSection] }
    }
    return sections
  }
}

export { SectionedDataBuilder }
export default SectionedDataBuilder
