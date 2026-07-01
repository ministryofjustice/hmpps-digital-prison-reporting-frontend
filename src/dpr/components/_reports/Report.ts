import { components } from 'src/dpr/types/api'
import { Request, Response } from 'express'
import parseUrl from 'parseurl'

// Utils
import { hasInteractiveFilters, getTemplate } from '../../utils/definitionUtils'
import PaginationUtils from './report-page/report-template/report-pagination/utils'
import TotalsUtils from './report-page/report-template/report-totals/utils'
import ReportTemplateUtils from './report-page/report-template/utils'
import ColumnUtils from './report-heading/report-columns/report-columns-form/utils'

// Types
import { Services } from '../../types/Services'
import { AsyncSummary, LoadType, ReportType, RequestedReport } from '../../types/UserReports'
import { Columns } from './report-heading/report-columns/report-columns-form/types'
import { Pagination } from './report-page/report-template/report-pagination/types'
import { ReportTemplateData } from '../../utils/TemplateBuilder/SectionedDataHelper/types'
import { DataTable } from '../../utils/DataTableBuilder/types'
import { ChildData } from '../../utils/TemplateBuilder/ParentChildDataBuilder/types'

// Classes
import ReportQuery from '../../types/ReportQuery'

// Helpers
import LocalsHelper from '../../utils/localsHelper'
import ErrorHandler from '../../utils/ErrorHandler/ErrorHandler'
import logger from '../../utils/logger'
import DataPresentation from '../_dashboards/DataPresentation'

type ReportDefinition = components['schemas']['SingleVariantReportDefinition']

export default class Report extends DataPresentation {
  variant!: components['schemas']['VariantDefinition']

  specification!: components['schemas']['Specification']

  reportData!: Record<string, string>[]

  childData: ChildData[] = []

  summariesData: AsyncSummary[] = []

  columns!: Columns

  count!: number

  pagination!: Pagination

  totals!: string

  dataTable!: DataTable | ReportTemplateData

  constructor(
    services: Services,
    res: Response,
    req: Request,
    definition: components['schemas']['SingleVariantReportDefinition'],
    loadType: LoadType,
    requestData?: RequestedReport | undefined,
  ) {
    super(services, res, req, definition, loadType, ReportType.REPORT, requestData)
    this.setSpecification()
  }

  setSpecification = () => {
    this.variant = (<ReportDefinition>this.definition).variant
    const { specification } = this.variant
    if (!specification) {
      throw new Error('No specification in definition')
    }
    this.specification = specification
  }

  build = async () => {
    // General report data
    const reportMeta = this.buildReportMeta(ReportType.REPORT)
    this.buildReportDetails()

    // Columns and filters
    this.buildColumns()
    await this.buildFilters()
    await this.buildSavedDefaultsConfig()
    this.buildAppliedFilters()

    // Get the data
    this.buildReportQuery()
    await this.getData()
    if (this.expired) {
      return {
        expired: this.expired,
      }
    }

    // Template & page furniture
    this.buildTable()
    this.buildActions(ReportType.REPORT, this.reportDetails.schedule)
    this.buildPagination()

    return {
      renderData: {
        columns: this.columns,
        filterData: this.filterData,
        appliedFilters: this.appliedFilters,
        ...this.savedDefaultsConfig,
        count: this.count,
        ...reportMeta,
        ...this.actions,
        ...this.reportDetails,
        ...(this.pagination && { pagination: this.pagination }),
        ...(this.extractedRequestData && this.extractedRequestData),
        totals: this.totals,
        dataTable: this.dataTable,
        fields: this.fields,
      },
    }
  }

  /**
   * Gets all the report data
   *
   */
  getData = async () => {
    try {
      await this.getReportData()
      if (this.loadType === LoadType.ASYNC) {
        await this.getSummariesData()
        await this.setChildData()
      }
      await this.getCount()
    } catch (error) {
      const dprError = new ErrorHandler(error).formatError()
      if (dprError.status === 404) {
        this.expired = true
      } else {
        throw error
      }
    }
  }

  /**
   * Gets the report data
   */
  getReportData = async () => {
    this.reportData = this.loadType === LoadType.SYNC ? await this.getSyncData() : await this.getAysncData()
  }

  private getAysncData = async () => {
    const reportQueryRecord = this.reportQuery.toRecordWithFilterPrefix(true)
    return this.services.reportingService.getAsyncReport(
      this.token,
      this.reportId,
      this.id,
      this.tableId,
      reportQueryRecord,
    )
  }

  private getSyncData = async () => {
    const { resourceName } = this.variant
    const listWithWarnings = await this.services.reportingService.getListWithWarnings(
      resourceName,
      this.token,
      this.reportQuery,
    )
    return listWithWarnings.data
  }

  /**
   * Gets the summaries data for summary tables
   * NOTE: Only available for Async
   *
   * @return {*}
   */
  getSummariesData = async () => {
    const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(this.res)
    this.summariesData = !this.variant.summaries
      ? []
      : await Promise.all(
          this.variant.summaries.map(async summary => {
            const summaryReport = await this.services.reportingService.getAsyncSummaryReport(
              this.token,
              this.reportId,
              this.id,
              this.tableId,
              summary.id,
              {
                dataProductDefinitionsPath,
              },
            )

            return {
              ...summary,
              data: summaryReport,
            }
          }),
        )

    logger.info('SUMMARY_SORT_BUG', JSON.stringify({ apiSummaries: this.summariesData }))
  }

  /**
   * Gets the child date for a parent child report
   * NOTE: Only available for Async
   *
   */
  setChildData = async () => {
    // Get the child data, if applicable
    const { childVariants } = this.variant
    this.childData = !childVariants
      ? []
      : await this.getChildData(childVariants, this.services, this.token, this.req, this.res, this.requestData)
  }

  getChildData = async (
    childVariants: components['schemas']['ChildVariantDefinition'][],
    services: Services,
    token: string,
    req: Request,
    res: Response,
    requestData?: RequestedReport,
  ): Promise<ChildData[]> => {
    const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
    const { reportId } = <{ reportId: string }>req.params
    const childExecutionData = requestData?.childExecutionData

    if (!childExecutionData) {
      throw new Error('getChildData: No execution data found for child variants')
    }

    return Promise.all(
      childVariants.map(async childVariant => {
        const { specification } = childVariant
        if (!specification) {
          throw new Error('getChildData: No specification found in child variant definition')
        }

        const query = new ReportQuery({
          fields: specification?.fields || [],
          template: 'parent-child',
          queryParams: req.query,
          definitionsPath: dataProductDefinitionsPath,
        }).toRecordWithFilterPrefix(true)

        const childData = childExecutionData.find(e => e.variantId === childVariant.id)
        if (!childData || !childData.tableId) {
          throw new Error('getChildData: No matching child execution data found')
        }
        const { tableId: childTableId } = childData

        const childReport = await services.reportingService.getAsyncReport(
          token,
          reportId,
          childVariant.id,
          childTableId,
          query,
        )

        return {
          id: childVariant.id,
          data: childReport,
        }
      }),
    )
  }

  /**
   * Builds the report table
   *
   */
  buildTable = () => {
    this.dataTable = ReportTemplateUtils.createReportTemplateData(
      this.definition as ReportDefinition,
      this.columns,
      this.reportData,
      this.childData,
      this.summariesData,
      this.reportQuery,
    )
  }

  /**
   * Gets the relevant report details from the report definition
   *
   */
  buildReportDetails = () => {
    const { name: reportName, description: reportDescription } = this.definition
    const { classification, printable, name, description, schedule } = this.variant
    const { template, fields } = this.specification

    this.reportDetails = {
      reportName,
      name,
      description: description || reportDescription || '',
      classification: classification || '',
      printable: Boolean(printable),
      template,
      specification: this.specification, // TODO: check if needed ???
      fields, // TODO: check if needed???
      schedule,
    }
  }

  /**
   * Build columns
   *
   */
  buildColumns = () => {
    this.columns = ColumnUtils.getColumns(this.specification, this.req)
  }

  /**
   * Builds the pagination config for a report
   */
  buildPagination = () => {
    const url = parseUrl(this.req)
    if (!url) {
      throw new Error('Unable to set url data from request')
    }

    let pagination
    let totals
    if (this.reportDetails.template === 'list') {
      pagination = PaginationUtils.getPaginationData(url, this.count, this.req)
      const { pageSize, currentPage, totalRows } = pagination
      totals = TotalsUtils.getTotals(pageSize, currentPage, totalRows, this.dataTable.rowCount)
    }

    if (pagination) {
      this.pagination = pagination
    }

    if (totals) {
      this.totals = totals
    }
  }

  /**
   * Gets the row count
   *
   * @return {*}
   */
  getCount = async () => {
    if (this.loadType === LoadType.SYNC) {
      this.count = await this.services.reportingService.getCount(
        this.variant.resourceName,
        this.token,
        this.reportQuery,
      )
    } else {
      this.count =
        !this.variant.interactive || !hasInteractiveFilters(this.fields ?? [])
          ? await this.services.reportingService.getAsyncCount(this.token, this.tableId)
          : await this.services.reportingService.getAsyncInteractiveCount(
              this.token,
              this.tableId,
              this.reportId,
              this.id,
              this.reportQuery,
            )
    }
  }

  /**
   * Builds the report query
   *
   */
  buildReportQuery = () => {
    const { definitionsPath } = LocalsHelper.getValues(this.res)
    const template = getTemplate(this.definition as ReportDefinition)

    // Sort
    const sortColumn = this.req.query?.['sortColumn'] || this.requestData?.sortBy?.data?.['sortColumn']
    const sortedAsc = this.req.query?.['sortedAsc'] || this.requestData?.sortBy?.data?.['sortedAsc']

    // Pagination
    const selectedPage = this.req.query?.['selectedPage']
    const pageSize = this.req.query?.['pageSize']

    // Filters query
    const filtersQuery = this.getCurrentQuery()

    const queryParams = {
      ...(sortColumn && { sortColumn }),
      ...(sortedAsc && { sortedAsc }),
      ...filtersQuery,
      ...(pageSize && { pageSize }),
      ...(selectedPage && { selectedPage }),
      ...(this.columns && { columns: this.columns.value }),
    }

    this.reportQuery = new ReportQuery({
      fields: this.fields ?? [],
      template,
      queryParams,
      definitionsPath,
    })
  }
}
