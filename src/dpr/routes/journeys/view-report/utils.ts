import { Request, Response } from 'express'
import { FilterType } from '../../../components/_filters/filter-input/enum'
import { components } from '../../../types/api'
import { StoredReportData } from '../../../types/UserReports'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import definitionUtils from '../../../utils/definitionUtils'
import DateMapper from '../../../utils/DateMapper/DateMapper'
import ColumnsUtils from '../../../components/_reports/report-columns-form/utils'

export const applyReportInteractiveQuery = async (
  req: Request,
  res: Response,
  services: Services,
  applyType: 'columns' | 'filters',
) => {
  const { reportId, id } = req.params
  const { token, definitionsPath } = LocalsHelper.getValues(res)

  // Get the definition
  const definition: components['schemas']['SingleVariantReportDefinition'] =
    await services.reportingService.getDefinition(token, reportId, id, definitionsPath)
  const fields = definition.variant.specification?.fields || []

  return applyInteractiveQuery(req, res, services, applyType, fields)
}

export const applyDashboardInteractiveQuery = async (
  req: Request,
  res: Response,
  services: Services,
  applyType: 'columns' | 'filters',
) => {
  const { reportId, id } = req.params
  const { token, definitionsPath } = LocalsHelper.getValues(res)

  // Get the definition
  const definition: components['schemas']['DashboardDefinition'] = await services.dashboardService.getDefinition(
    token,
    reportId,
    id,
    definitionsPath,
  )
  const fields = definition.filterFields || []

  return applyInteractiveQuery(req, res, services, applyType, fields)
}

const applyInteractiveQuery = async (
  req: Request,
  res: Response,
  services: Services,
  applyType: 'columns' | 'filters',
  fields: components['schemas']['FieldDefinition'][],
) => {
  const { tableId, id } = req.params
  const { dprUser } = LocalsHelper.getValues(res)

  // get the report state
  let reportStateData: StoredReportData | undefined
  if (tableId) {
    // means its an async report
    reportStateData = await services.recentlyViewedService?.getReportByTableId(tableId, dprUser.id)
  } else {
    // its a sync report and can be indentified by ID as will always only be 1
    reportStateData = await services.recentlyViewedService?.getReportById(id, dprUser.id)
  }

  // Get the stored interactive query data
  const interactiveQueryData = reportStateData?.interactiveQuery?.data

  const preventDefault = interactiveQueryData?.['preventDefault']
  const pageSize = interactiveQueryData?.['pageSize']
  const selectedPage = interactiveQueryData?.['selectedPage']
  const sortColumn = interactiveQueryData?.['sortColumn']
  const sortedAsc = interactiveQueryData?.['sortedAsc']

  let filters = {}
  if (interactiveQueryData) {
    filters = Object.keys(interactiveQueryData)
      .filter((key) => key.includes('filters.'))
      .reduce((acc, key) => ({ ...acc, [key]: interactiveQueryData[key] }), {})
  }

  // Create merged form data
  let formData: Record<string, string | string[]> = {
    ...(preventDefault && { preventDefault }),
    ...(selectedPage && { selectedPage }),
    ...(pageSize && { pageSize }),
    ...(sortColumn && { sortColumn }),
    ...(sortedAsc && { sortedAsc }),
    ...req.body,
  }

  if (applyType === 'columns') {
    const { columns } = req.body
    const mandatoryCols = ColumnsUtils.mandatoryColumns(fields)

    let bodyColumns = []
    if (columns) {
      bodyColumns = Array.isArray(columns) ? columns : [columns]
    }
    const columnsData = [...mandatoryCols, ...bodyColumns]
    formData = { ...formData, columns: columnsData, ...filters }
  } else {
    const columns = interactiveQueryData?.['columns'] || []
    formData = { ...formData, columns }
  }

  // Create query string
  const filtersString = createQueryParamsFromFormData({
    formData,
    fields,
  })

  // Redirect back to report
  res.redirect(`${req.baseUrl}?${filtersString}`)
}

const createQueryParamsFromFormData = ({
  formData,
  fields,
}: {
  fields: components['schemas']['FieldDefinition'][]
  formData: Record<string, string | string[]>
}) => {
  // create the query string
  const params = new URLSearchParams()
  Object.keys(formData).forEach((key) => {
    const value = formData[key]

    if (value && key !== '_csrf') {
      const fieldId = key.split('.')[1] // filters are prefixed with 'filters.'
      if (fieldId) {
        const filter = definitionUtils.getFilter(fields, fieldId)
        if (filter) {
          const { type: filterType } = filter
          switch (filterType.toLocaleLowerCase()) {
            // DATE RANGE TYPES
            case FilterType.date.toLocaleLowerCase():
            case FilterType.dateRange.toLocaleLowerCase():
            case FilterType.granularDateRange.toLocaleLowerCase():
              {
                let dateValue: string = <string>value
                const dateMapper = new DateMapper()
                const currentDateFormat = dateMapper.getDateType(dateValue)
                if (currentDateFormat !== 'none') {
                  dateValue = dateMapper.toDateString(dateValue, 'iso') || ''
                }
                if (dateValue) {
                  params.append(key, dateValue)
                }
              }
              break

            // MULTIVALUE TYPES: string[] || string if only one value selected
            case FilterType.multiselect.toLocaleLowerCase():
              if (Array.isArray(value)) {
                const multiselectValue = <string[]>value
                multiselectValue.forEach((v: string) => {
                  params.append(key, v)
                })
              } else {
                params.append(key, <string>value)
              }
              break

            // OTHER TYPES - always a string
            default:
              params.append(key, <string>value)
              break
          }
        }
      } else if (Array.isArray(value)) {
        value.forEach((v: string) => {
          params.append(key, v)
        })
      } else {
        params.append(key, value)
      }
    }
  })

  const encodedFilters = params.toString()
  return decodeURIComponent(encodedFilters)
}

export default {
  applyDashboardInteractiveQuery,
  applyReportInteractiveQuery,
}
