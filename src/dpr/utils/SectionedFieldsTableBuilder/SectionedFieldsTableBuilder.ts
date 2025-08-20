import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable, FieldDefinition } from '../DataTableBuilder/types'
import type { Template } from '../../types/Templates'
import ParentChildDataTableBuilder from '../ParentChildDataTableBuilder/ParentChildDataTableBuilder'

interface SectionedField {
  name: string
  fields?: string[]
  child?: string
}

export default class SectionedFieldsDataTableBuilder extends ParentChildDataTableBuilder {
  // TODO: change this to use schema type if ever implemented in the backend
  sectionedFields: SectionedField[]

  template: Template

  constructor(variant: components['schemas']['VariantDefinition']) {
    // TODO: removed the union if sectionedFields changed to use schema type
    const { sectionedFields, template } = variant.specification as components['schemas']['Specification'] & {
      sectionedFields: SectionedField[]
    }
    super(variant)

    this.sectionedFields = sectionedFields
    this.sections = this.sectionedFields.map((f) => f.name)
    this.template = template
  }

  getChildFields(childId: string): FieldDefinition[] {
    const childVariant = this.variant.childVariants.find((child) => child.id === childId)
    return childVariant ? childVariant.specification.fields : []
  }

  getJoinKey() {
    return this.variant.childVariants[0].joinFields[0]
  }

  initSectionedData(data: Array<Dict<string>>) {
    return data.flatMap((row) => {
      const initialisedSectionsWithFields = this.sectionedFields.map((section) => {
        const sectionHeader = this.mapNamesToFields([section.name])[0]

        let fields: FieldDefinition[] = []
        const { child } = section

        if (section.fields) {
          fields = this.mapNamesToFields(section.fields)
        } else if (section.child) {
          fields = this.getChildFields(section.child)
        }

        return {
          header: sectionHeader,
          fields,
          child,
        }
      })

      return initialisedSectionsWithFields.map((section) => {
        if (section.child) {
          const childData = this.getChildData(section.child)
          const displayFields = section.fields.filter((f) => f.visible)
          const joinKey = this.getJoinKey()

          return {
            header: section.header.display,
            fields: childData.data
              .filter((cd) => cd[joinKey] === row[joinKey])
              .map((cd) => {
                return {
                  heading: cd[displayFields[0]?.name] || 'Not found',
                  data: cd[displayFields[1]?.name] || 'Not found',
                }
              }),
          }
        }
        return {
          header: section.header.display,
          fields: section.fields
            .filter((f) => f.visible)
            .map((f) => {
              return {
                heading: f.display,
                data: row[f.name],
              }
            }),
        }
      })
    })
  }

  getChildData(childId: string) {
    return this.childData.find((d) => d.id === childId)
  }

  createRows(data: Array<Dict<string>>): Cell[][] {
    const sectionedData = this.initSectionedData(data)

    const rows = sectionedData.flatMap((section, index) => {
      const sectionHeaderRow = this.createSectionHeader(section.header, index)
      const sectionRows = section.fields.map((field) => {
        return [
          {
            text: field.heading,
            classes: 'dpr-row-heading',
          },
          {
            text: field.data,
            classes: 'dpr-row-heading-data',
          },
        ]
      })
      return [...sectionHeaderRow, ...sectionRows]
    })

    return rows
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: [
        // { text: '', classes: 'dpr-row-section-header' },
        // { text: '', classes: 'dpr-row-section-header-value' },
      ],
      rows: this.createRows(data),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}
