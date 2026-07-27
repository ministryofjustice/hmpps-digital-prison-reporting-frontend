import { Request, Response } from 'express'

// Types
import { DashboardParentChildData } from 'src/dpr/utils/TemplateBuilder/ParentChildDataBuilder/types'
import { components } from '../../types/api'
import { DashboardDataResponse } from '../../types/Metrics'
import { Services } from '../../types/Services'
import { LoadType, ReportType, RequestedReport } from '../../types/UserReports'
import { FilterType } from '../_filters/filter-input/enum'
import { GranularDateRangeFilterValue, PartialDate } from '../_filters/types'
import {
  DashboardDefinition as DashboardDefinitionWithChildVariants,
  DashboardSection,
} from './dashboard-visualisation/types'

// Classes
import ReportQuery from '../../types/ReportQuery'

// Helpers
import DefinitionUtils from '../../utils/definitionUtils'
import ErrorHandler from '../../utils/ErrorHandler/ErrorHandler'
import LocalsHelper from '../../utils/localsHelper'
import { createDashboardSections } from './dashboard-section/utils'
import DataPresentation from './DataPresentation'

type DashboardDefinition = components['schemas']['DashboardDefinition']

export default class Dashboard extends DataPresentation {
  sections!: DashboardSection[]

  dashboardData!: DashboardDataResponse[]

  parentChildData: DashboardParentChildData[] = []

  partialDate!: PartialDate | undefined

  dashboardFeatureFlags: Record<string, boolean>

  constructor(
    services: Services,
    res: Response,
    req: Request,
    definition: DashboardDefinition,
    loadType: LoadType,
    requestData?: RequestedReport | undefined,
  ) {
    super(services, res, req, definition, loadType, ReportType.DASHBOARD, requestData)

    this.dashboardFeatureFlags = res.app.locals['featureFlags'].flags
  }

  build = async () => {
    const reportMeta = this.buildReportMeta(ReportType.DASHBOARD)

    this.buildDashboardDetails()

    await this.buildFilters()

    await this.buildSavedDefaultsConfig()

    this.buildAppliedFilters()

    this.buildReportQuery()

    await this.getData()

    if (this.expired) {
      return {
        expired: this.expired,
      }
    }

    this.buildSections()

    await this.buildActions(ReportType.DASHBOARD)

    return {
      dashboardData: {
        ...reportMeta,
        ...this.reportDetails,
        sections: this.sections,
        filters: this.filterData,
        appliedFilters: this.appliedFilters,
        ...this.savedDefaultsConfig,
        ...this.actions,
        ...(this.extractedRequestData && this.extractedRequestData),
      },
    }
  }

  /**
   * Gets all the report data
   *
   */
  getData = async () => {
    try {
      await this.getDashboardData()
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
   * Gets the dashboard data
   */
  getDashboardData = async () => {
    this.dashboardData = this.loadType === LoadType.SYNC ? await this.getSyncData() : await this.getAsyncData()
    await this.setParentChildData()
  }

  private getAsyncData = async () => {
    const dashboardQueryRecord = this.reportQuery.toRecordWithFilterPrefix(true)

    const dashboardResultData = await this.services.dashboardService.getAsyncDashboard(
      this.token,
      this.reportId,
      this.id,
      this.tableId,
      dashboardQueryRecord,
    )

    return Array.isArray(dashboardResultData) ? dashboardResultData.flat().filter(Boolean) : []
  }

  private getSyncData = async () => {
    const reportQueryRecord = this.reportQuery.toRecordWithFilterPrefix(true)

    const dashboardData: DashboardDataResponse[][] = await this.services.dashboardService.getSyncDashboard(
      this.token,
      this.id,
      this.reportId,
      reportQueryRecord,
    )

    return Array.isArray(dashboardData) ? dashboardData.flat().filter(Boolean) : []
  }

  setParentChildData = async () => {
    // Get the child data, if applicable
    const childVariants = (this.definition as DashboardDefinitionWithChildVariants)?.childVariants

    this.parentChildData = !childVariants
      ? []
      : await this.getParentChildData(childVariants, this.services, this.token, this.req, this.res, this.requestData)
  }

  /**
   * Gets the parent and child data for a parent child dashboard, returns in a single array with the parent data first, followed by the child data
   * NOTE: Only available for Async
   *
   */
  getParentChildData = async (
    childVariants: DashboardDefinition[],
    services: Services,
    token: string,
    req: Request,
    res: Response,
    requestData?: RequestedReport,
  ): Promise<DashboardParentChildData[]> => {
    const { definitionsPath: dataProductDefinitionsPath } = LocalsHelper.getValues(res)
    const { reportId } = <{ reportId: string }>req.params
    const childExecutionData = requestData?.childExecutionData

    if (!childExecutionData) {
      throw new Error('getParentChildData: No execution data found for child variants')
    }

    const allChildData = await Promise.all(
      childVariants.map(async childVariant => {
        const query = new ReportQuery({
          fields: this.fields || [],
          template: 'parent-child',
          queryParams: req.query,
          definitionsPath: dataProductDefinitionsPath,
        }).toRecordWithFilterPrefix(true)

        const childData = childExecutionData.find(e => e.variantId === childVariant.id)
        if (!childData || !childData.tableId) {
          throw new Error('getParentChildData: No matching child execution data found')
        }
        const { tableId: childTableId } = childData

        const childDashboard = await services.dashboardService.getAsyncDashboard(
          token,
          reportId,
          childVariant.id,
          childTableId,
          query,
        )

        return {
          id: childVariant.id,
          data: childDashboard.flat().filter(Boolean),
        }
      }),
    )

    const parentData = { id: this.definition.id, data: this.dashboardData }

    return [parentData, ...allChildData]
  }

  /**
   * Gets the relevant report details from the report definition
   *
   */
  buildDashboardDetails = async () => {
    const { definitionsPath } = LocalsHelper.getValues(this.res)

    const reportDefinition =
      this.res.locals['reportDefinitionSummary'] ??
      (await DefinitionUtils.getReportSummary(
        this.reportId,
        this.services.reportingService,
        this.token,
        definitionsPath,
      ))

    const { name, description } = this.definition

    this.reportDetails = {
      reportName: reportDefinition.name,
      name,
      description: description || reportDefinition.description || '',
      printable: false,
      fields: this.fields ?? [],
    }
  }

  buildSections = () => {
    this.sections = createDashboardSections(
      this.definition as DashboardDefinition,
      this.dashboardData,
      this.parentChildData,
      this.reportQuery.toRecordWithFilterPrefix(true),
      this.dashboardFeatureFlags,
      this.partialDate,
    )
  }

  buildPartialDate = () => {
    let partialDate: PartialDate | undefined
    const granularDateRangeFilter = <GranularDateRangeFilterValue | undefined>(
      this.filterData.find(f => f.type === FilterType.granularDateRange.toLowerCase())
    )
    if (granularDateRangeFilter) {
      partialDate = granularDateRangeFilter.value.partialDate
    }
    this.partialDate = partialDate
  }

  /**
   * Builds the report query
   */
  buildReportQuery = () => {
    const { definitionsPath } = LocalsHelper.getValues(this.res)

    const queryParams = {
      ...this.getCurrentQuery(),
    }

    this.reportQuery = new ReportQuery({
      fields: this.fields ?? [],
      queryParams,
      definitionsPath,
      reportType: ReportType.DASHBOARD,
    })
  }
}
