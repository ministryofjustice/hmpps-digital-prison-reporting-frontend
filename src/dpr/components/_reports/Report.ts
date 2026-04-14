import { components } from 'src/dpr/types/api'
import { Request, Response } from 'express'
import parseUrl from 'parseurl'

// Utils
import { setUpBookmark } from '../bookmark/utils'
import { setUpDownload } from '../../routes/journeys/download-report/utils'
import ReportActionsUtils from './report-heading/report-actions/utils'
import { hasInteractiveFilters, getFields, getTemplate } from '../../utils/definitionUtils'
import PaginationUtils from './report-page/report-template/report-pagination/utils'
import TotalsUtils from './report-page/report-template/report-totals/utils'
import ReportTemplateUtils from './report-page/report-template/utils'
import ReportFiltersUtils from '../_filters/utils'
import { SelectedFilter } from '../_filters/filters-selected/utils'
import ColumnUtils from './report-heading/report-columns/report-columns-form/utils'
import { qsToQueryObject } from '../../utils/urlHelper'

// Types
import { Services } from '../../types/Services'
import { AsyncSummary, LoadType, ReportType, RequestedReport } from '../../types/UserReports'
import { ExtractedDefinitionData, ExtractedRequestData } from '../../routes/journeys/view-report/async/report/types'
import { Columns } from './report-heading/report-columns/report-columns-form/types'
import { DownloadActionParams, ReportAction } from './report-heading/report-actions/types'
import { Pagination } from './report-page/report-template/report-pagination/types'
import { ReportTemplateData } from '../../utils/TemplateBuilder/SectionedDataHelper/types'
import { DataTable } from '../../utils/DataTableBuilder/types'
import { FiltersType } from '../_filters/filtersTypeEnum'
import { FilterValue } from '../_filters/types'
import { ChildData } from '../../utils/TemplateBuilder/ParentChildDataBuilder/types'

// Classes
import ReportQuery from '../../types/ReportQuery'

// Helpers
import { getActiveJourneyValue } from '../../utils/sessionHelper'
import LocalsHelper from '../../utils/localsHelper'
import { AppliedFilterChip, buildAppliedFilters } from '../_filters/filters-applied/utils'
import { apiTimestampToUiDateTime } from '../../utils/dateHelper'

export default class Report {
  id: string

  reportId: string

  tableId: string

  token: string

  variant: components['schemas']['VariantDefinition']

  specification: components['schemas']['Specification']

  reportData!: Record<string, string>[]

  childData: ChildData[] = []

  summariesData: AsyncSummary[] = []

  reportDetails!: ExtractedDefinitionData

  actions!: {
    actions: ReportAction[]
    downloadConfig: DownloadActionParams | undefined
    bookmarkConfig: {
      bookmarkActionEndpoint: string
      showBookmark: boolean
      linkText: string
      linkType: string
    }
    feedbackFormHref: string | undefined
  }

  columns!: Columns

  count!: number

  pagination!: Pagination

  totals!: string

  dataTable!: DataTable | ReportTemplateData

  filterData!: {
    filters: FilterValue[]
    selectedFilters: SelectedFilter[]
    hasDefaults: boolean | undefined
    canSaveDefaults: boolean
  }

  reportQuery!: ReportQuery

  appliedFilters!: AppliedFilterChip[]

  extractedRequestData!: ExtractedRequestData | undefined

  constructor(
    readonly services: Services,
    readonly res: Response,
    readonly req: Request,
    readonly definition: components['schemas']['SingleVariantReportDefinition'],
    readonly loadType: LoadType,
    readonly requestData?: RequestedReport | undefined,
  ) {
    // From locals
    this.token = res.locals['dprUser'].token

    // From params
    this.id = <string>this.req.params['id']
    this.reportId = <string>this.req.params['reportId']
    this.tableId = <string>this.req.params['tableId']

    // From definition
    this.variant = this.definition.variant
    const { specification } = this.variant
    if (!specification) {
      throw new Error('No specification in definition')
    }
    this.specification = specification
  }

  build = async () => {
    // General report data
    const reportMeta = this.buildReportMeta()
    this.buildReportDetails()

    // Columns and filters
    this.buildColumns()
    await this.buildFilters()
    this.buildAppliedFilters()

    // Data retrieval
    this.buildReportQuery()
    await this.getData()
    await this.getCount()

    // Template & page furniture
    this.buildTable()
    this.buildActions()
    this.buildPagination()

    return {
      renderData: {
        columns: this.columns,
        filterData: this.filterData,
        appliedFilters: this.appliedFilters,
        count: this.count,
        ...reportMeta,
        ...this.actions,
        ...this.reportDetails,
        ...(this.pagination && { pagination: this.pagination }),
        ...(this.extractedRequestData && this.extractedRequestData),
        totals: this.totals,
        dataTable: this.dataTable,
      },
    }
  }

  /**
   * Gets all the report data
   *
   */
  getData = async () => {
    if (this.loadType === LoadType.ASYNC) {
      await this.getSummariesData()
      await this.setChildData()
    }
    await this.getReportData()
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
          this.variant.summaries.map(async (summary) => {
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
      childVariants.map(async (childVariant) => {
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

        const childData = childExecutionData.find((e) => e.variantId === childVariant.id)
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
      this.definition,
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
    const { classification, printable, name, description } = this.variant
    const { template, fields } = this.specification

    this.reportDetails = {
      reportName,
      name,
      description: description || reportDescription,
      classification,
      printable: Boolean(printable),
      template,
      specification: this.specification, // TODO: check if needed ???
      fields, // TODO: check if needed???
    }
  }

  /**
   * Gets the reports meta data required to load a report
   *
   * @return {*}
   */
  buildReportMeta = () => {
    return {
      id: this.id,
      reportId: this.reportId,
      ...(this.tableId && { tableId: this.tableId }),
      loadType: this.loadType,
      csrfToken: this.res.locals['csrfToken'],
      type: ReportType.REPORT,
    }
  }

  /**
   * Extracts the relevant data from the requested report data
   *
   * @param {RequestedReport} requestData
   * @return {*}  {ExtractedRequestData}
   */
  extractDataFromRequest = (requestData: RequestedReport): ExtractedRequestData => {
    const { query, url, timestamp } = requestData
    return {
      executionId: requestData.executionId,
      requestedTimestamp: apiTimestampToUiDateTime(timestamp.requested),
      querySummary: query?.summary || [],
      queryData: query?.data,
      requestUrl: url?.request,
      defaultQuery: url?.report?.default,
      dataProductDefinitionsPath: requestData.dataProductDefinitionsPath,
    }
  }

  /**
   * Builds the report actions:
   * - download config
   * - bookmark config
   * - general actions
   */
  buildActions = () => {
    const { tableId, reportId, id } = <{ id: string; tableId: string; reportId: string }>this.req.params
    this.extractedRequestData = this.requestData ? this.extractDataFromRequest(this.requestData) : undefined

    // Setup bookmark
    const bookmarkConfig = setUpBookmark(this.res, this.req, this.services.bookmarkService)

    // Setup download
    const downloadConfig = setUpDownload(
      this.res,
      this.req,
      this.reportDetails,
      this.columns,
      this.loadType,
      this.extractedRequestData,
    )

    // Setup other actions
    const actions = ReportActionsUtils.setActions(this.reportDetails, downloadConfig, this.extractedRequestData)

    // Get the feedback submission path
    const sessionKey = this.loadType === LoadType.SYNC ? { id, reportId } : { id, reportId, tableId }
    const feedbackSubmissionFormPath = getActiveJourneyValue(this.req, sessionKey, 'feedbackSubmissionFormPath')

    this.actions = {
      actions,
      downloadConfig,
      bookmarkConfig,
      feedbackFormHref: feedbackSubmissionFormPath,
    }
  }

  /**
   * Build thee filters
   *
   */
  buildFilters = async () => {
    this.filterData = await ReportFiltersUtils.getFilters({
      fields: getFields(this.definition),
      req: this.req,
      res: this.res,
      services: this.services,
      filtersType: FiltersType.INTERACTIVE,
    })
  }

  /**
   * Builds the applied filters buttons
   *
   */
  buildAppliedFilters = () => {
    const fields = getFields(this.definition)
    const sessionKey = { id: this.id, reportId: this.reportId, tableId: this.tableId }
    this.appliedFilters = buildAppliedFilters(this.req, sessionKey, fields)
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
    this.count =
      !this.variant.interactive || !hasInteractiveFilters(getFields(this.definition))
        ? await this.services.reportingService.getAsyncCount(this.token, this.tableId)
        : await this.services.reportingService.getAsyncInteractiveCount(
            this.token,
            this.tableId,
            this.reportId,
            this.id,
            this.reportQuery,
          )
  }

  /**
   * Builds the report query
   *
   */
  buildReportQuery = () => {
    const { definitionsPath } = LocalsHelper.getValues(this.res)
    const fields = getFields(this.definition)
    const template = getTemplate(this.definition)

    // Sort
    const sortColumn = this.req.query?.['sortColumn'] || this.requestData?.sortBy?.data?.['sortColumn']
    const sortedAsc = this.req.query?.['sortedAsc'] || this.requestData?.sortBy?.data?.['sortedAsc']

    // Pagination
    const selectedPage = this.req.query?.['selectedPage']
    const pageSize = this.req.query?.['pageSize']

    // Filters from query string
    // 1. Initialise the filters query to the defaults from the DPD
    const interactiveDefaultSearch = getActiveJourneyValue(
      this.req,
      { id: this.id, reportId: this.reportId },
      'interactiveDefaultFiltersSearch',
    )
    let filtersQuery = interactiveDefaultSearch ? qsToQueryObject(interactiveDefaultSearch, 'filters.') : {}

    // 2. Get the search params from the current report and use those if they are present
    const currentSearch = getActiveJourneyValue(
      this.req,
      { id: this.id, reportId: this.reportId, tableId: this.tableId },
      'currentReportFiltersSearch',
    )
    if (currentSearch) {
      filtersQuery = qsToQueryObject(currentSearch, 'filters.')
    }

    const queryParams = {
      ...(sortColumn && { sortColumn }),
      ...(sortedAsc && { sortedAsc }),
      ...filtersQuery,
      ...(pageSize && { pageSize }),
      ...(selectedPage && { selectedPage }),
      ...(this.columns && { columns: this.columns.value }),
    }

    this.reportQuery = new ReportQuery({
      fields,
      template,
      queryParams,
      definitionsPath,
    })
  }
}
