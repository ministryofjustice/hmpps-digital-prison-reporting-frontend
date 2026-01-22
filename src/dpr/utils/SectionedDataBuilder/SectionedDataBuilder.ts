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

  sectionedDataArray: SectionedData[] = []

  sectionedData!: SectionedData

  createSectionKey(row: Record<string, string>) {
    // Build structured entries with column names + values
    const keyObj = this.sections.map((col) => ({
      name: col,
      value: row[col] ?? '',
    }))
    const keyValues = keyObj.map((v) => v.value).join('')
    const key = keyValues !== '' ? JSON.stringify(keyObj) : 'mainSection'

    return {
      keyObj: key === 'mainSection' ? [] : keyObj,
      key,
    }
  }

  createSectionTitle(
    keyObj: { name: string; value: string }[],
    fields: components['schemas']['FieldDefinition'][] | components['schemas']['SummaryField'][],
  ) {
    return keyObj
      .map((column) => {
        const fieldName = getFieldDisplayName(fields, column.name)
        return `${fieldName}: ${column.value}`
      })
      .join(', ')
  }

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
  ) {
    const sectionMap = data.reduce<Record<string, SectionData>>((acc, row) => {
      const { key, keyObj } = this.createSectionKey(row)
      const title = this.createSectionTitle(keyObj, fields)

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

    this.sectionedDataArray.push({
      sections: Object.values(sectionMap),
    })
  }

  createSummarySections() {
    this.summariesData.forEach((summaryData) => {
      const { fields, id, template, data } = summaryData
      this.groupBySections(<Array<Record<string, string>>>data, fields, { id, template })
    })
  }

  mergeSections(): SectionedData {
    return {
      sections: this.sectionedDataArray
        .flatMap((input) => input.sections)
        .reduce<SectionData[]>((acc, section) => {
          const { key } = section
          const existing = acc.find((s) => s.key === key)

          // If section doesn't exist yet → add fresh copy
          if (!existing) {
            return acc.concat({
              key: section.key || '',
              title: section.title || '',
              count: section.count,
              summaries: section.summaries ? [...section.summaries] : [],
              data: section.data ? [...section.data] : [],
            })
          }

          // If exists → update it by concatenating data & summaries
          const updated = acc.map((s) =>
            s.key === key
              ? {
                  ...s,
                  count: s.count + section.count,
                  summaries: (s.summaries ?? []).concat(section.summaries ?? []),
                  data: (s.data ?? []).concat(section.data ?? []),
                }
              : s,
          )

          return updated
        }, []),
    }
  }

  withSections(sections: string[]) {
    this.sections = sections
    return this
  }

  withFields(fields: components['schemas']['FieldDefinition'][]) {
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
      this.groupBySections(this.data, this.fields)
      this.createSummarySections()
      sections = this.mergeSections()
    } else {
      const singleSection: SectionData = {
        key: 'mainSection',
        data: this.data,
        count: this.data.length,
        summaries: this.summariesData,
      }
      sections = { sections: [singleSection] }
    }

    return sections
  }
}

export { SectionedDataBuilder }
export default SectionedDataBuilder
