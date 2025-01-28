import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable, FieldDefinition } from '../DataTableBuilder/types'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { distinct } from '../arrayUtils'
import { ParentChildSortKey } from './types'

export default class ParentChildDataTableBuilder extends DataTableBuilder {

  private variant: components['schemas']['VariantDefinition']
  private childData: Dict<Array<Dict<string>>> = {}

  constructor(variant: components['schemas']['VariantDefinition']) {
    super(variant.specification.fields)
    this.variant = variant
  }

  private mapParentChildData(parentData: Array<Dict<string>>, header: Cell[]): Cell[][] {
    let sectionedData: Dict<Dict<Array<Dict<string>>>> = {}

    const joinFields = this.mapNamesToFields(
      this.variant.childVariants
      .flatMap(c => c.joinFields)
      .reduce(distinct, [])
    )

    const sectionKeys = this.calculateSectionKeys(parentData, joinFields)

    sectionKeys.forEach((parentKey) => {
      sectionedData[parentKey.sortKey] = {
        parent: []
      }
    })

    sectionedData = this.splitParentDataIntoSections(sectionedData, parentData, joinFields)

    this.splitChildDataIntoSections(this.childData, sectionKeys, sectionedData)
    const childDataTableBuilders = this.createChildDataTableBuilders()

    return sectionKeys.flatMap((key) => {
      const sectionData = sectionedData[key.sortKey]
      const parentData = sectionData.parent ?? []

      return (parentData.length > 0 ? [header] : [])
        .concat(parentData.map(r => this.mapRow(r)))
        .concat(
          this.variant.childVariants
            .filter(childVariant => sectionData[childVariant.id])
            .map(childVariant => {
              const dataTable = childDataTableBuilders[childVariant.id]
                .buildTable(sectionData[childVariant.id])

              return [
                {
                  format: 'string',
                  html: `<h4>${childVariant.name}</h4>\n${this.convertDataTableToHtml(dataTable)}`,
                  colspan: this.columns.length
                }
              ]
            })
        )
    })
  }

  private createChildDataTableBuilders() {
    const childDataTables: Dict<DataTableBuilder> = this.variant.childVariants.reduce((previousValue, childVariant) => {
      const fieldNamesToDisplay = childVariant.specification.fields
        .filter(f => f.visible || f.mandatory)
        .map(f => f.name)

      const dataTableBuilder = new DataTableBuilder(childVariant.specification.fields)
        .withNoHeaderOptions(fieldNamesToDisplay)
        .withSortedData()

      return {
        ...previousValue,
        [childVariant.id]: dataTableBuilder,
      }
    }, {})
    return childDataTables
  }

  private calculateSectionKeys(parentData: Array<NodeJS.Dict<string>>, joinFields: FieldDefinition[]) {
    return parentData
      .map((rowData): ParentChildSortKey => ({
        sortKey: this.getSortKey(rowData, joinFields),
        childSortKeys: this.variant.childVariants.reduce((previousValue, childVariant) => {
          return {
            ...previousValue,
            [childVariant.id]: this.getSortKey(rowData, this.mapNamesToFields(childVariant.joinFields)),
          }
        }, {}),
      }))
      .sort(this.sortKeyComparison())
      .reduce((previousValue: ParentChildSortKey[], sortKey: ParentChildSortKey) => {
        if (previousValue.find(v => v.sortKey === sortKey.sortKey)) {
          return previousValue
        }
        return previousValue.concat(sortKey)
      }, [])
  }

  private splitParentDataIntoSections(sectionedData: NodeJS.Dict<NodeJS.Dict<Array<NodeJS.Dict<string>>>>, parentData: Array<NodeJS.Dict<string>>, joinFields: FieldDefinition[]) {
    return parentData.reduce((previousValue, rowData) => {
      const parentKey: string = this.getSortKey(rowData, joinFields)
      const previousParentValue = previousValue[parentKey].parent

      const newParentValue = {
        parent: previousParentValue.concat(rowData),
      }

      return {
        ...previousValue,
        [parentKey]: newParentValue,
      }
    }, sectionedData)
  }

  private splitChildDataIntoSections(childData: NodeJS.Dict<Array<NodeJS.Dict<string>>>, parentKeys: ParentChildSortKey[], sectionedData: NodeJS.Dict<NodeJS.Dict<Array<NodeJS.Dict<string>>>>) {
    this.variant.childVariants.forEach(childVariant => {
      const childFields = this.mapNamesToFields(childVariant.joinFields)

      childData[childVariant.id].forEach(rowData => {
        const sortKey = this.getSortKey(rowData, childFields)
        const parentSortKey = parentKeys.find(p => p.childSortKeys[childVariant.id] === sortKey).sortKey
        const existingChildData = sectionedData[parentSortKey][childVariant.id] ?? []

        sectionedData[parentSortKey][childVariant.id] = existingChildData.concat(rowData)
      })
    })
  }

  withChildData(childData: Dict<Array<Dict<string>>>) {
    this.childData = childData
    return this
  }

  buildTable(data: Array<Dict<string>>): DataTable {
    return {
      head: null,
      rows: this.mapParentChildData(data, this.mapHeader(true, 'govuk-table__header')),
      rowCount: data.length,
      colCount: this.columns.length,
    }
  }
}
