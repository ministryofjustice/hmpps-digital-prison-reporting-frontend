import { SummaryTemplate } from '../../types/Templates'
import { AsyncSummary } from '../../types/UserReports'
import { components } from '../../types/api'
import { getFieldsByName, getFieldDisplayName } from '../definitionUtils'
import { SectionData, SectionedData, SectionKey } from './types'

class SectionedDataBuilder {
  sections: Array<string> = []

  data: Array<Record<string, string>> = []

  fields: components['schemas']['FieldDefinition'][] = []

  summariesData: AsyncSummary[] = []

  sectionedDataArray: SectionedData[] = []

  sectionedData!: SectionedData

  createSectionKey(row: Record<string, string>): { keyObj: SectionKey[]; key: string } {
    // Build structured entries with column names + values
    const keyObj: SectionKey[] = this.sections.map((col) => ({
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
    keyObj: SectionKey[],
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
          keyObj,
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
          const { key, keyObj } = section
          const existing = acc.find((s) => s.key === key)

          // If section doesn't exist yet → add fresh copy
          if (!existing) {
            return acc.concat({
              key: section.key || '',
              keyObj: keyObj || [],
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

  /**
   * Sorts sections based on keyObj values using an optional nameOrder override.
   * - nameOrder can be partial; unspecified names fall back to default order
   * - Default order is derived from the first section's keyObj sequence
   */
  sortSections(sectionedData: SectionedData, nameOrder: string[] = []): SectionedData {
    const { sections } = sectionedData
    if (sections.length === 0) return sectionedData

    // Default order is the order of the keyObj.name fields in the first section
    const defaultOrder = sections[0].keyObj.map((k) => k.name)

    // Merge partial nameOrder with default order
    const finalOrder = nameOrder
      // 1. start with user-specified names
      .filter((name) => defaultOrder.includes(name))
      // 2. append missing names in default order
      .concat(defaultOrder.filter((name) => !nameOrder.includes(name)))

    // Build map for fast comparison
    const buildMap = (keyObj: SectionKey[]) =>
      keyObj.reduce<Record<string, string>>((acc, ko) => ({ ...acc, [ko.name]: ko.value }), {})

    const sortedSections = [...sections].sort((a, b) => {
      const aMap = buildMap(a.keyObj)
      const bMap = buildMap(b.keyObj)

      // Compare using final order
      const comparisons = finalOrder.map((name) => {
        const aVal = aMap[name] ?? ''
        const bVal = bMap[name] ?? ''
        return aVal.localeCompare(bVal, undefined, { numeric: true })
      })

      // Return first non-zero comparison
      return comparisons.find((x) => x !== 0) ?? 0
    })

    return {
      sections: sortedSections,
    }
  }

  withSections(sections: string[]) {
    this.sections = sections || []
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
    this.summariesData = summaryData || []
    return this
  }

  build(): SectionedData {
    let sections: SectionedData
    if (this.sections.length) {
      this.groupBySections(this.data, this.fields)
      this.createSummarySections()
      sections = this.mergeSections()
      sections = this.sortSections(sections)
    } else {
      const singleSection: SectionData = {
        key: '',
        keyObj: [],
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
