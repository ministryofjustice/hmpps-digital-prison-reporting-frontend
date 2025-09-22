import { RequestHandler } from 'express'
import { StoredReportData } from '../../../../types/UserReports'
import { components } from '../../../../types/api'
import definitionUtils from '../../../../utils/definitionUtils'
import { FilterType } from '../../../../components/_filters/filter-input/enum'
import { Services } from '../../../../types/Services'
import UserReportsListUtils from '../../../../components/user-reports/utils'
import LocalsHelper from '../../../../utils/localsHelper'
import DateMapper from '../../../../utils/DateMapper/DateMapper'

export default class AsyncController {
  layoutPath: string

  services: Services

  constructor(layoutPath: string, services: Services) {
    this.layoutPath = layoutPath
    this.services = services
  }

  applyFilters: RequestHandler = async (req, res, next) => {
    const { type, tableId, reportId, id } = req.params
    const { dprUser, token, definitionsPath } = LocalsHelper.getValues(res)

    // Get the definition
    const definition: components['schemas']['SingleVariantReportDefinition'] =
      await this.services.reportingService.getDefinition(token, reportId, id, definitionsPath)
    const fields = definition.variant.specification.fields || []

    // get the report state to get columns
    const reportStateData: StoredReportData = await this.services.recentlyViewedService.getReportByTableId(
      tableId,
      dprUser.id,
    )

    // Create merged form data
    const formData = {
      ...req.body,
      columns: reportStateData.interactiveQuery.data.columns,
    }

    // create the query string
    const params = new URLSearchParams()
    console.log(formData)
    Object.keys(formData).forEach((key) => {
      let value = formData[key]

      if (value) {
        const fieldId = key.split('.')[1] // filters are prefixed with 'filters.'
        console.log({ fieldId })
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
                  console.log({ FilterType })
                  const dateMapper = new DateMapper()
                  const currentDateFormat = dateMapper.getDateType(value)
                  if (currentDateFormat !== 'none') {
                    value = dateMapper.toDateString(formData[key], 'iso')
                  }
                }
                console.log({ key, value })
                params.append(key, value)
                break

              // MULTIVALUE TYPES
              case FilterType.multiselect.toLocaleLowerCase():
                value.forEach((v: string) => {
                  params.append(key, v)
                })
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
          console.log('-------')
        }
      }
    })

    console.log({ params })

    const encodedFilters = params.toString()
    const filtersString = decodeURIComponent(encodedFilters)
    res.redirect(`${req.baseUrl}/${type}?${filtersString}`)
  }

  applyColumns: RequestHandler = async (req, res, next) => {
    const { type } = req.params
    res.redirect(`${req.baseUrl}/${type}`)
  }

  checkExpiredStatus: RequestHandler = async (req, res, next) => {
    try {
      const response = await UserReportsListUtils.updateExpiredStatus({
        req,
        res,
        services: this.services,
      })
      res.send({ isExpired: response })
    } catch (error) {
      res.send({ status: 'FAILED' })
    }
  }
}
