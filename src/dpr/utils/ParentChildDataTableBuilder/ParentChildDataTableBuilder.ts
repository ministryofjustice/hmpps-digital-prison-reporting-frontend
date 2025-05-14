import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable, FieldDefinition } from '../DataTableBuilder/types'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { distinct } from '../arrayUtils'
import { ChildData, ParentChildSortKey } from './types'
import logger from '../logger'
import SectionedDataTableBuilder from '../SectionedDataTableBuilder/SectionedDataTableBuilder'

export default class ParentChildDataTableBuilder extends SectionedDataTableBuilder {
  private variant: components['schemas']['VariantDefinition']

  private childData: Array<ChildData> = []

  constructor(variant: components['schemas']['VariantDefinition']) {
    const { specification } = variant
    const { sections, template } = specification
    super(specification)

    this.sections = sections
    this.template = template
    this.variant = variant
  }

  private createParentChildTable(parentData: Array<Dict<string>>, header: Cell[]) {
    let sectionedParentChildData: Dict<Dict<Array<Dict<string>>>> = {}

    // Get the parent-child joins definition data
    const joinFields = this.mapNamesToFields(
      this.variant.childVariants.flatMap((c) => c.joinFields).reduce(distinct, []),
    )

    // Create the section keys and
    const parentChildKeys = this.calculateParentChildKeys(parentData, joinFields)
    parentChildKeys.forEach((parentKey) => {
      sectionedParentChildData[parentKey.sortKey] = {
        parent: [],
      }
    })

    sectionedParentChildData = this.splitParentDataIntoSections(sectionedParentChildData, parentData, joinFields)
    sectionedParentChildData = this.splitChildDataIntoSections(parentChildKeys, sectionedParentChildData)

    const childDataTableBuilders = this.createChildDataTableBuilders()

    const parentChildTable = parentChildKeys.flatMap((key) => {
      const sectionData = sectionedParentChildData[key.sortKey]
      const parentSectionData = sectionData.parent

      return [header].concat(parentSectionData.map((r) => this.mapRow(r))).concat(
        this.variant.childVariants
          .filter((childVariant) => sectionData[childVariant.id])
          .map((childVariant) => {
            const dataTable = childDataTableBuilders[childVariant.id].buildTable(sectionData[childVariant.id])

            return [
              {
                format: 'string',
                html: `<div class='dpr-child-report'><h3>${childVariant.name}</h3>${this.convertDataTableToHtml(
                  dataTable,
                )}</div>`,
                colspan: this.columns.length,
              },
            ]
          }),
      )
    })

    return parentChildTable
  }

  private createParentChildSectionRows(parentData: Array<Dict<string>>, header: Cell[]) {
    const sectionsDetails = this.mapSections(parentData)
    const sectionedData = sectionsDetails.sectionedData as Dict<Array<Dict<string>>>
    const sectionedParentChildSectionedRows: {
      sectionDescription: string
      rows: Cell[][]
      count: number
      countDescription: string
    }[] = []

    Object.keys(sectionedData).forEach((sectionDescription) => {
      const data = sectionedData[sectionDescription] as Array<Dict<string>>
      sectionedParentChildSectionedRows.push({
        sectionDescription,
        ...this.getSectionCount(sectionedData, sectionDescription),
        rows: this.createParentChildTable(data, header),
      })
    })

    const rows = sectionedParentChildSectionedRows.flatMap((section) => {
      return [
        [
          {
            colspan: this.columns.length,
            html: `<h2>${section.sectionDescription}${
              section.count > 0 ? ` <span class='govuk-caption-m'>${section.countDescription}</span>` : ''
            }</h2>`,
          },
        ],
        ...section.rows,
      ]
    })

    return rows
  }

  private mapParentChildData(parentData: Array<Dict<string>>, header: Cell[]): Cell[][] {
    if (this.sections?.length) {
      return this.createParentChildSectionRows(parentData, header)
    }
    return this.createParentChildTable(parentData, header)
  }

  private createChildDataTableBuilders() {
    const childDataTables: Dict<DataTableBuilder> = this.variant.childVariants.reduce((previousValue, childVariant) => {
      const fieldNamesToDisplay = childVariant.specification.fields
        .filter((f) => f.visible || f.mandatory)
        .map((f) => f.name)

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

  private calculateParentChildKeys(parentData: Array<NodeJS.Dict<string>>, joinFields: FieldDefinition[]) {
    return parentData
      .map(
        (rowData): ParentChildSortKey => ({
          sortKey: this.getSortKey(rowData, joinFields),
          childSortKeys: this.variant.childVariants.reduce((previousValue, childVariant) => {
            return {
              ...previousValue,
              [childVariant.id]: this.getSortKey(rowData, this.mapNamesToFields(childVariant.joinFields)),
            }
          }, {}),
        }),
      )
      .reduce((previousValue: ParentChildSortKey[], sortKey: ParentChildSortKey) => {
        if (previousValue.find((v) => v.sortKey === sortKey.sortKey)) {
          return previousValue
        }
        return previousValue.concat(sortKey)
      }, [])
  }

  private splitParentDataIntoSections(
    sectionedParentChildData: NodeJS.Dict<NodeJS.Dict<Array<NodeJS.Dict<string>>>>,
    parentData: Array<NodeJS.Dict<string>>,
    joinFields: FieldDefinition[],
  ) {
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
    }, sectionedParentChildData)
  }

  private splitChildDataIntoSections(
    parentKeys: ParentChildSortKey[],
    sectionedParentChildData: Dict<Dict<Array<Dict<string>>>>,
  ): Dict<Dict<Array<Dict<string>>>> {
    const sectionedParentChildDataWithChildren = { ...sectionedParentChildData }

    this.variant.childVariants.forEach((childVariant) => {
      const childFields = this.mapNamesToFields(childVariant.joinFields)
      logger.info(
        'DPR-Parent-child-template-debugging splitChildDataIntoSections',
        JSON.stringify({
          childFields,
          parentKeys,
        }),
      )

      const matchingChildData = this.childData.find((d) => d.id === childVariant.id)
      const data = matchingChildData ? matchingChildData.data : []

      data
        .filter((rowData) => {
          const sortKey = this.getSortKey(rowData, childFields)
          return parentKeys.find((p) => p.childSortKeys[childVariant.id] === sortKey)
        })
        .forEach((rowData) => {
          const sortKey = this.getSortKey(rowData, childFields)
          const parentSortKey = parentKeys.find((p) => p.childSortKeys[childVariant.id] === sortKey).sortKey
          const existingChildData = sectionedParentChildDataWithChildren[parentSortKey][childVariant.id] ?? []

          sectionedParentChildDataWithChildren[parentSortKey][childVariant.id] = existingChildData.concat(rowData)
        })
    })

    return sectionedParentChildDataWithChildren
  }

  withChildData(childData: Array<ChildData>) {
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
