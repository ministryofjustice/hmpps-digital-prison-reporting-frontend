import { Template } from '../../types/Templates'
import { components } from '../../types/api'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import {
  ChildData,
  GroupedParentChildDataset,
  ParentChildData,
  ParentChildDataset,
  ParentChildTemplateData,
} from './types'

class ParentChildDataBuilder {
  variant: components['schemas']['VariantDefinition']

  protected columns: Array<string> = []

  protected childColumns: Array<string> = []

  childVariants: components['schemas']['ChildVariantDefinition'][] = []

  childData: Array<ChildData> = []

  parentData: Array<Record<string, string>> = []

  template: Template

  joinFields: Array<components['schemas']['FieldDefinition']> = []

  childFields: Array<components['schemas']['FieldDefinition']> = []

  parentChildDatasets: ParentChildDataset[] = []

  dataTableBuilder!: DataTableBuilder

  parentFields: components['schemas']['FieldDefinition'][]

  constructor(variant: components['schemas']['VariantDefinition'], parentData: Array<Record<string, string>>) {
    const { specification } = variant
    const { template, fields } = <components['schemas']['Specification']>specification

    this.template = template
    this.parentFields = fields
    this.variant = variant
    this.childVariants = this.variant.childVariants || []
    this.parentData = parentData
  }

  getChildVariant(childId: string) {
    return this.childVariants.find((cv) => cv.id === childId)
  }

  /**
   * Exracts the relevant data from the child variant definition
   * to generate the child table
   *
   * @param {string} childId
   * @return { fields: components['schemas']['FieldDefinition'][], joinFields: string[], columns: string[], name: string }
   * @memberof ParentChildDataBuilder
   */
  getChildVariantDefinitionData(childId: string) {
    const childVariant = this.getChildVariant(childId)

    let fields: components['schemas']['FieldDefinition'][] = []
    let joinFields: string[] = []
    let columns: string[] = []
    let name = 'Child report'

    if (childVariant && childVariant.specification) {
      fields = childVariant.specification.fields
      joinFields = childVariant && childVariant.specification ? childVariant.joinFields : []
      columns = fields.filter((f) => f.visible).map((f) => f.name)
      name = childVariant.name
    }

    return {
      fields,
      joinFields,
      columns,
      name,
    }
  }

  /**
   * Maps the parent child rows together, and splits into sections
   * to create the parent table
   *
   * @return {*}  {GroupedParentChildDataset[]}
   * @memberof ParentChildDataBuilder
   */
  mergeParentChildAndGroup(): GroupedParentChildDataset[] {
    const groups: GroupedParentChildDataset[] = []
    let pendingParents: Array<Record<string, string>> = []

    this.parentData.forEach((parentRow) => {
      // Build a dataset for this parent
      const dataset: ParentChildDataset = {
        parent: parentRow,
        children: [],
      }

      // Match against each child dataset
      this.childData.forEach((child) => {
        const { joinFields } = this.getChildVariantDefinitionData(child.id)
        const matchedChildren: Record<string, string>[] = []

        // Compare join fields
        child.data.forEach((childRow) => {
          const isMatch = joinFields.every((col) => {
            return parentRow[col] === childRow[col]
          })
          if (isMatch) matchedChildren.push(childRow)
        })

        if (matchedChildren.length) {
          dataset.children.push({
            id: child.id,
            data: matchedChildren,
          })
        }
      })

      // Always collect the parent
      pendingParents.push(dataset.parent)

      // If dataset has children → close the group
      if (dataset.children.length > 0) {
        groups.push({
          parent: pendingParents,
          children: dataset.children,
        })
        pendingParents = []
      }
    })

    // If leftover parents exist, make a final group (empty children)
    if (pendingParents.length > 0) {
      groups.push({
        parent: pendingParents,
        children: [],
      })
    }

    return groups
  }

  /**
   * Maps the parent child data to a table data
   *
   * @param {GroupedParentChildDataset[]} parentChildGroups
   * @return {*}  {ParentChildData[]}
   * @memberof ParentChildDataBuilder
   */
  mapToTableData(parentChildGroups: GroupedParentChildDataset[]): ParentChildData[] {
    const parentTableBuilder = new DataTableBuilder(this.parentFields)

    return parentChildGroups.map((group: GroupedParentChildDataset) => {
      const parentTable = parentTableBuilder.withNoHeaderOptions(this.columns).buildTable(group.parent)

      const children: ParentChildData['children'] = group.children.map((child) => {
        const { fields: childFields, columns: childColumns, name } = this.getChildVariantDefinitionData(child.id)
        const childTableBuilder = new DataTableBuilder(childFields)
        const childTable = childTableBuilder.withNoHeaderOptions(childColumns).buildTable(child.data)

        return {
          title: name,
          rows: childTable.rows,
          head: childTable.head,
        }
      })

      return {
        parent: {
          head: parentTable.head,
          rows: parentTable.rows,
        },
        children,
      }
    })
  }

  withChildData(childData: Array<ChildData>) {
    this.childData = childData
    return this
  }

  withParentColumns(columns: string[]) {
    this.columns = columns
    return this
  }

  withChildColumns(childColumns: string[]) {
    this.childColumns = childColumns
    return this
  }

  build(): ParentChildTemplateData {
    const groups = this.mergeParentChildAndGroup()
    const table = this.mapToTableData(groups)

    return {
      rowCount: this.parentData.length,
      sections: [
        {
          data: table,
        },
      ],
    }
  }
}

export { ParentChildDataBuilder }
export default ParentChildDataBuilder
