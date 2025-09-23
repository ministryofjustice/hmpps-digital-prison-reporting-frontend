import { Request, Response } from 'express'
import { FilterType } from '../../../components/_filters/filter-input/enum'
import { components } from '../../../types/api'
import { StoredReportData } from '../../../types/UserReports'
import { Services } from '../../../types/Services'
import LocalsHelper from '../../../utils/localsHelper'
import definitionUtils from '../../../utils/definitionUtils'
import DateMapper from '../../../utils/DateMapper/DateMapper'

const applyInteractiveFilters = async (req: Request, res: Response, services: Services) => {
  const { type, tableId, reportId, id } = req.params
  const { dprUser, token, definitionsPath } = LocalsHelper.getValues(res)

  // Get the definition
  const definition: components['schemas']['SingleVariantReportDefinition'] =
    await services.reportingService.getDefinition(token, reportId, id, definitionsPath)
  const fields = definition.variant.specification.fields || []

  // get the report state to get columns
  let reportStateData: StoredReportData
  if (tableId) {
    // means its an async report
    reportStateData = await services.recentlyViewedService.getReportByTableId(tableId, dprUser.id)
  } else {
    // its a sync report and can be indentified by ID as will always only be 1
    reportStateData = await services.recentlyViewedService.getReportById(id, dprUser.id)
  }

  // Create merged form data
  const formData: Record<string, string | string[]> = {
    ...req.body,
    columns: reportStateData.interactiveQuery.data.columns,
  }

  // Create query string
  const filtersString = createQueryParamsFromFormData({
    formData,
    fields,
  })

  // Redirect back to report
  res.redirect(`${req.baseUrl}/${type}?${filtersString}`)
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

    if (value) {
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
                let dateValue = <string>value
                const dateMapper = new DateMapper()
                const currentDateFormat = dateMapper.getDateType(dateValue)
                if (currentDateFormat !== 'none') {
                  dateValue = dateMapper.toDateString(dateValue, 'iso')
                }
                params.append(key, dateValue)
              }
              break

            // MULTIVALUE TYPES
            case FilterType.multiselect.toLocaleLowerCase():
              {
                const multiselectValue = <string[]>value
                multiselectValue.forEach((v: string) => {
                  params.append(key, v)
                })
              }
              break

            default:
              if (Array.isArray(value)) {
                value.forEach((v: string) => {
                  params.append(key, v)
                })
              } else {
                params.append(key, value)
              }
              break
          }
        }
      }
    }
  })

  const encodedFilters = params.toString()
  return decodeURIComponent(encodedFilters)
}

export default {
  applyInteractiveFilters,
}
