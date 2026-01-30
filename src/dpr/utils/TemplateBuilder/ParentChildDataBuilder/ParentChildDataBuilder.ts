import { components } from '../../../types/api'
import DataTableBuilder from '../../DataTableBuilder/DataTableBuilder'
import { DataTable } from '../../DataTableBuilder/types'
import { SectionedDataHelper } from '../SectionedDataHelper/SectionedDataHelper'
import { ReportTemplateData, SectionData } from '../SectionedDataHelper/types'
import { TemplateBuilder } from '../TemplateBuilder'
import { ChildData, GroupedParentChildDataset, ParentChildTableData, ParentChildDataset } from './types'

export class ParentChildDataBuilder extends TemplateBuilder {
  childColumns: Array<string> = []

  childVariants: components['schemas']['ChildVariantDefinition'][] = []

  childData: Array<ChildData> = []

  joinFields: Array<components['schemas']['FieldDefinition']> = []

  childFields: Array<components['schemas']['FieldDefinition']> = []

  parentChildDatasets: ParentChildDataset[] = []

  dataTableBuilder!: DataTableBuilder

  constructor(variant: components['schemas']['VariantDefinition']) {
    super(variant)

    this.childVariants = this.variant.childVariants || []
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
   * Maps the parent child rows.
   * Splits into sections that will become the parent table
   *
   * @return {*}  {GroupedParentChildDataset[]}
   * @memberof ParentChildDataBuilder
   */
  mergeParentChildAndGroup(parentData: Record<string, string>[]): GroupedParentChildDataset[] {
    const groups: GroupedParentChildDataset[] = []
    let pendingParents: Array<Record<string, string>> = []

    parentData.forEach((parentRow) => {
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
  mapToTableData(parentChildGroups: GroupedParentChildDataset[]): ParentChildTableData[] {
    const parentTableBuilder = new DataTableBuilder(this.fields)
    return parentChildGroups.map((group: GroupedParentChildDataset) => {
      const parentTable = parentTableBuilder.withNoHeaderOptions(this.columns).buildTable(group.parent)
      const children: ParentChildTableData['children'] = this.mapChildDataToTableData(group)

      return {
        parent: parentTable,
        children,
      }
    })
  }

  /**
   * Maps the grouped child data to table data
   *
   * @param {GroupedParentChildDataset} group
   * @return {*}
   * @memberof ParentChildDataBuilder
   */
  mapChildDataToTableData(group: GroupedParentChildDataset) {
    return group.children.map((child) => {
      const { fields: childFields, columns: childColumns, name } = this.getChildVariantDefinitionData(child.id)
      const childTableBuilder = new DataTableBuilder(childFields)
      const childTable = childTableBuilder.withNoHeaderOptions(childColumns).buildTable(child.data)

      return {
        title: name,
        ...childTable,
      }
    })
  }

  withChildData(childData: Array<ChildData>) {
    this.childData = childData
    return this
  }

  withChildColumns(childColumns: string[]) {
    this.childColumns = childColumns
    return this
  }

  build(): ReportTemplateData {
    const sectionData = new SectionedDataHelper()
      .withSections(this.sections)
      .withData(this.data)
      .withFields(this.fields)
      .withReportQuery(this.reportQuery)
      .build()

    const { sections } = sectionData
    const mappedSections = sections.map((section: SectionData) => {
      const groups = this.mergeParentChildAndGroup(<Array<Record<string, string>>>section.data)
      const table = this.mapToTableData(groups)

      return {
        ...section,
        summaries: [] as unknown as Record<string, DataTable[]>,
        data: table,
      }
    })

    return {
      rowCount: this.data.length,
      sections: mappedSections,
    }
  }
}
