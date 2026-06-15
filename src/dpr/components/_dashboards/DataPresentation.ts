import { components } from 'src/dpr/types/api'
import { Request, Response } from 'express'
import { Services } from 'src/dpr/types/Services'
import ReportQuery from 'src/dpr/types/ReportQuery'
import { ExtractedDefinitionData, ExtractedRequestData } from 'src/dpr/routes/journeys/view-report/async/report/types'
import { LoadType, ReportType, RequestedReport } from 'src/dpr/types/UserReports'
import { apiTimestampToUiDateTime } from 'src/dpr/utils/dateHelper'
import { setUpDownload } from 'src/dpr/routes/journeys/download-report/utils'
import { getActiveJourneyValue } from 'src/dpr/utils/sessionHelper'
import { qsToQueryObject } from 'src/dpr/utils/queryMappers'
import { FilterValue } from '../_filters/types'
import { AppliedFilterChip, buildAppliedFilters } from '../_filters/filters-applied/utils'
import { DownloadActionParams, ReportAction } from '../_reports/report-heading/report-actions/types'
import LocalsHelper from '../../utils/localsHelper'
import ReportFiltersUtils from '../_filters/utils'
import { getDashboardFields, getFields } from '../../utils/definitionUtils'
import { FiltersType } from '../_filters/filtersTypeEnum'
import { setUpBookmark } from '../bookmark/utils'
import ReportActionsUtils from '../_reports/report-heading/report-actions/utils'

export default class DataPresentation {
  // Meta

  id: string

  reportId: string

  tableId: string

  token: string

  userId: string

  expired: boolean = false

  extractedRequestData!: ExtractedRequestData | undefined

  reportDetails!: ExtractedDefinitionData

  // Structure

  fields: components['schemas']['FieldDefinition'][] | undefined | null

  // Request

  reportQuery!: ReportQuery

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

  // Filters

  filterData!: FilterValue[]

  appliedFilters!: AppliedFilterChip[]

  savedDefaultsConfig!: {
    hasDefaults: boolean | undefined
    saveDefaultsEnabled: boolean
  }

  constructor(
    readonly services: Services,
    readonly res: Response,
    readonly req: Request,
    readonly definition:
      | components['schemas']['DashboardDefinition']
      | components['schemas']['SingleVariantReportDefinition'],
    readonly loadType: LoadType,
    readonly type: ReportType,
    readonly requestData?: RequestedReport | undefined,
  ) {
    // From locals
    this.token = res.locals['dprUser'].token
    this.userId = res.locals['dprUser'].id

    // From params
    this.id = <string>this.req.params['id']
    this.reportId = <string>this.req.params['reportId']
    this.tableId = <string>this.req.params['tableId']

    this.getFields()
  }

  getFields = () => {
    this.fields =
      this.type === ReportType.REPORT
        ? getFields(<components['schemas']['SingleVariantReportDefinition']>this.definition)
        : getDashboardFields(<components['schemas']['DashboardDefinition']>this.definition)
  }

  buildReportMeta = (type: ReportType) => {
    const { csrfToken } = LocalsHelper.getValues(this.res)
    return {
      id: this.id,
      reportId: this.reportId,
      ...(this.tableId && { tableId: this.tableId }),
      loadType: this.loadType,
      csrfToken,
      type,
    }
  }

  /**
   * Build the filters
   */
  buildFilters = async () => {
    this.filterData = await ReportFiltersUtils.getInteractiveFilters({
      fields: this.fields ?? [],
      req: this.req,
    })
  }

  /**
   * Builds the applied filters buttons
   *
   */
  buildAppliedFilters = () => {
    const sessionKey = { id: this.id, reportId: this.reportId, tableId: this.tableId }
    this.appliedFilters = buildAppliedFilters(this.req, sessionKey, this.fields ?? [])
  }

  buildSavedDefaultsConfig = async () => {
    this.savedDefaultsConfig = {
      hasDefaults: await this.services.defaultFilterValuesService.hasDefaults(
        this.userId,
        this.reportId,
        this.id,
        FiltersType.INTERACTIVE,
      ),
      saveDefaultsEnabled: this.res.app.locals['saveDefaultsEnabled'],
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
  buildActions = (type: ReportType) => {
    const { tableId, reportId, id } = <{ id: string; tableId: string; reportId: string }>this.req.params
    this.extractedRequestData = this.requestData ? this.extractDataFromRequest(this.requestData) : undefined

    // Setup bookmark
    const bookmarkConfig = setUpBookmark(this.res, this.req, this.services.bookmarkService)

    // Setup download
    const downloadConfig = type === ReportType.REPORT ? setUpDownload(this.res, this.req) : undefined

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

  getCurrentQuery = () => {
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

    return filtersQuery
  }
}
