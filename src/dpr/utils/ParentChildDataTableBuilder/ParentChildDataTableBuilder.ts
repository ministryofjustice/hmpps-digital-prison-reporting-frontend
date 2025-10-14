import Dict = NodeJS.Dict
import { components } from '../../types/api'
import { Cell, DataTable, FieldDefinition } from '../DataTableBuilder/types'
import DataTableBuilder from '../DataTableBuilder/DataTableBuilder'
import { distinct } from '../arrayUtils'
import { ChildData, ParentChildSortKey } from './types'
import logger from '../logger'
import SectionedDataTableBuilder from '../SectionedDataTableBuilder/SectionedDataTableBuilder'

export default class ParentChildDataTableBuilder extends SectionedDataTableBuilder {
  variant: components['schemas']['VariantDefinition']

  childVariants: components['schemas']['ChildVariantDefinition'][]

  childData: Array<ChildData> = []

  constructor(variant: components['schemas']['VariantDefinition']) {
    const { specification } = variant
    const { sections, template } = <components['schemas']['Specification']>specification
    super(<components['schemas']['Specification']>specification)

    this.sections = sections
    this.template = template
    this.variant = variant
    this.childVariants = this.variant.childVariants || []
  }

  private createParentChildTable(parentData: Array<Dict<string>>, header: Cell[]) {
    let sectionedParentChildData: Dict<Dict<Array<Dict<string>>>> = {}
    const joinFields = this.mapNamesToFields(this.childVariants.flatMap((c) => c.joinFields).reduce(distinct, []))
    logger.info({ joinFields })
    // Get the parent-child joins definition data

    // Create the section keys and
    const parentChildKeys = this.calculateParentChildKeys(parentData, joinFields)
    logger.info({ parentChildKeys })
    parentChildKeys.forEach((parentKey) => {
      sectionedParentChildData[parentKey.sortKey] = {
        parent: [],
      }
    })

    sectionedParentChildData = this.splitParentDataIntoSections(sectionedParentChildData, parentData, joinFields)
    sectionedParentChildData = this.splitChildDataIntoSections(parentChildKeys, sectionedParentChildData)

    logger.info({ sectionedParentChildData })

    const childDataTableBuilders = this.createChildDataTableBuilders()

    const parentChildTable = parentChildKeys.flatMap((key) => {
      const sectionData = sectionedParentChildData[key.sortKey] || {}

      let parentSectionData: Dict<string>[] = []
      if (sectionData) {
        parentSectionData = sectionData.parent ? sectionData.parent : []
      }

      return [header].concat(parentSectionData.map((r) => this.mapRow(r, 'dpr-parent-cell'))).concat(
        this.childVariants
          .filter((childVariant) => sectionData && sectionData[childVariant.id])
          .map((childVariant) => {
            const builder = childDataTableBuilders[childVariant.id]
            const section = sectionData[childVariant.id]
            const dataTable = builder && section ? builder.buildTable(section) : undefined
            const dataTableHtml = dataTable ? this.convertDataTableToHtml(dataTable) : ''

            return [
              {
                classes: 'dpr-child-report-cell',
                format: 'string',
                html: `<div class='dpr-child-report'><h2 class="govuk-heading-s">${childVariant.name}</h2><div class="dpr-child-report_table">${dataTableHtml}</div></div>`,
                colspan: this.columns.length,
              },
            ]
          }),
      )
    })

    logger.info({ parentChildTable })

    return parentChildTable
  }

  private createParentChildSectionRows(parentData: Array<Dict<string>>, header: Cell[]) {
    const sectionsDetails = this.mapSections(parentData)
    logger.info(sectionsDetails)
    const sectionedData = sectionsDetails.sectionedData as Dict<Array<Dict<string>>>
    const sectionedParentChildSectionedRows: {
      sectionDescription: string
      rows: Cell[][]
      count: number
      countDescription: string
    }[] = []

    Object.keys(sectionedData).forEach((sectionDescription) => {
      logger.info({ sectionDescription })
      const data = sectionedData[sectionDescription] as Array<Dict<string>>
      logger.info({ data })

      sectionedParentChildSectionedRows.push({
        sectionDescription,
        ...this.getSectionCount(sectionedData, sectionDescription),
        rows: this.createParentChildTable(data, header),
      })
      logger.info({ sectionedParentChildSectionedRows })
    })

    const rows = sectionedParentChildSectionedRows.flatMap((section, index) => {
      const sectionHeader = this.createSectionHeader(
        section.sectionDescription,
        index,
        section.count,
        section.countDescription,
      )
      return [...sectionHeader, ...section.rows]
    })
    logger.info({ rows })

    return rows
  }

  private mapParentChildData(parentData: Array<Dict<string>>, header: Cell[]): Cell[][] {
    if (this.sections?.length) {
      return this.createParentChildSectionRows(parentData, header)
    }
    return this.createParentChildTable(parentData, header)
  }

  private createChildDataTableBuilders() {
    const childDataTables: Dict<DataTableBuilder> = this.childVariants.reduce((previousValue, childVariant) => {
      const { specification } = childVariant
      const fields = specification ? specification.fields : []
      const fieldNamesToDisplay = fields.filter((f) => f.visible || f.mandatory).map((f) => f.name)

      const dataTableBuilder = new DataTableBuilder(fields).withNoHeaderOptions(fieldNamesToDisplay).withSortedData()

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
          childSortKeys: this.childVariants.reduce((previousValue, childVariant) => {
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
      const previousParentValue = previousValue[parentKey] ? previousValue[parentKey].parent : []

      return {
        ...previousValue,
        ...(previousParentValue && {
          [parentKey]: {
            parent: previousParentValue.concat(rowData),
          },
        }),
      }
    }, sectionedParentChildData)
  }

  private splitChildDataIntoSections(
    parentKeys: ParentChildSortKey[],
    sectionedParentChildData: Dict<Dict<Array<Dict<string>>>>,
  ): Dict<Dict<Array<Dict<string>>>> {
    const sectionedParentChildDataWithChildren = { ...sectionedParentChildData }

    this.childVariants.forEach((childVariant) => {
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
          const parent = parentKeys.find((p) => p.childSortKeys[childVariant.id] === sortKey)
          const parentSortKey = parent ? parent.sortKey : ''
          const parentSection = sectionedParentChildDataWithChildren[parentSortKey]
          if (parentSection) {
            const existingChildData = parentSection[childVariant.id] || []
            parentSection[childVariant.id] = existingChildData.concat(rowData)
          }
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
