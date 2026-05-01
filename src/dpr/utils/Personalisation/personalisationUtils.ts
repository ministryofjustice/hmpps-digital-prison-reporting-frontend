import { Request, Response } from 'express'
import { Services } from '../../types/Services'
import localsHelper from '../localsHelper'
import { ReportType } from '../../types/UserReports'
import { components } from '../../types/api'
import { FilterType } from '../../components/_filters/filter-input/enum'
import DateRangeInputUtils from '../../components/_inputs/date-range/utils'
import GranularDateRangeInputUtils from '../../components/_inputs/granular-date-range/utils'
import { FilterValue, FilterValueWithOptions } from '../../components/_filters/types'
import { defaultFilterValue } from './types'
import { FiltersType } from '../../components/_filters/filtersTypeEnum'
import { uiDateToApi } from '../dateHelper'
import { logger } from '../logger'

export const saveDefaults = async (type: FiltersType, res: Response, req: Request, services: Services) => {
  const { dprUser } = localsHelper.getValues(res)
  const { reportId, id } = req.params as { reportId: string; id: string }

  const defaultValuesForReport = await getDefaultValues(req, res, services, type)

  const { defaultFilterValuesService } = services
  return defaultFilterValuesService
    ? defaultFilterValuesService.save(dprUser.id, reportId, id, defaultValuesForReport)
    : undefined
}

export const removeDefaults = async (type: FiltersType, res: Response, req: Request, services: Services) => {
  const { dprUser } = localsHelper.getValues(res)
  const { reportId, id } = <{ id: string; reportId: string }>req.params
  const { defaultFilterValuesService } = services
  return defaultFilterValuesService ? defaultFilterValuesService.delete(dprUser.id, reportId, id, type) : undefined
}

const getDefaultValues = async (
  req: Request,
  res: Response,
  services: Services,
  filtersType: FiltersType,
): Promise<defaultFilterValue[]> => {
  const { token, definitionsPath } = localsHelper.getValues(res)
  const { reportId, id, type } = <{ id: string; type: string; reportId: string }>req.params

  let definition: components['schemas']['SingleVariantReportDefinition'] | components['schemas']['DashboardDefinition']
  let fields = []
  if (type === ReportType.REPORT) {
    definition = await services.reportingService.getDefinition(token, reportId, id, definitionsPath)
    fields = definition.variant.specification?.fields || []
  } else {
    definition = await services.dashboardService.getDefinition(token, reportId, id, definitionsPath)
    fields = definition.filterFields || []
  }

  const bodyFilterValues = Object.keys(req.body)
    .filter((k) => {
      return k.startsWith('filters.') || k.includes('sortColumn') || k.includes('sortedAsc')
    })
    .map((k) => {
      return { name: k.replace('filters.', ''), value: req.body[k] }
    })
    .map((k) => {
      const n = k.name.split('.')[0]
      const field = fields.find((f) => f.name === n)
      let { value, name } = k

      if (field) {
        const filterType = field.filter?.type.toLocaleLowerCase()

        switch (filterType) {
          case FilterType.multiselect.toLocaleLowerCase():
            value = Array.isArray(k.value) ? k.value.join(',') : k.value
            break

          case FilterType.dateRange.toLocaleLowerCase():
            ;({ value, name } = DateRangeInputUtils.setDefaultValue(req, name))
            break

          case FilterType.granularDateRange.toLocaleLowerCase():
            ;({ name, value } = GranularDateRangeInputUtils.setDefaultValue(req, name))
            break

          default:
            break
        }
      }

      return {
        name,
        value,
        type: filtersType,
      }
    })

  const defaultValuesConfig = Array.from(new Set(bodyFilterValues.map((a) => a.name)))
    .map((name) => {
      return bodyFilterValues.find((a) => a.name === name)
    })
    .filter((c) => c !== undefined)

  const result = defaultValuesConfig.filter((defaultValue) => {
    return defaultValue ? defaultValue.value !== '' : false
  })

  return result
}

export const setUserContextDefaults = (res: Response, filters: FilterValue[]) => {
  const { dprUser } = localsHelper.getValues(res)
  const { activeCaseLoadId } = dprUser

  logger.info('PERSONALISATION DEBUG: SETTING USER CONTEXT DEFAULTS')
  logger.info(`PERSONALISATION DEBUG: dprUser: ${dprUser}`)
  logger.info(`PERSONALISATION DEBUG: activeCaseLoadId: ${activeCaseLoadId}`)

  filters.forEach((filter, index) => {
    logger.info(
      `PERSONALISATION DEBUG: (${index}) : Is autocomplete: `,
      filter.type.toLocaleLowerCase() === FilterType.autocomplete.toLocaleLowerCase(),
    )
    logger.info(
      `PERSONALISATION DEBUG: (${index}) : Is establishment: `,
      filter.text.toLocaleLowerCase().includes('establishment'),
    )
    logger.info(
      `PERSONALISATION DEBUG: (${index}) : Has activeCaseLoadId: `,
      activeCaseLoadId && activeCaseLoadId.length,
    )

    if (
      filter.type.toLocaleLowerCase() === FilterType.autocomplete.toLocaleLowerCase() &&
      filter.text.toLocaleLowerCase().includes('establishment') &&
      activeCaseLoadId &&
      activeCaseLoadId.length
    ) {
      logger.info(`PERSONALISATION DEBUG: (${index}): Autocomplete filter found:`)
      logger.info(`PERSONALISATION DEBUG: (${index}): updated filter: ${filter}`)

      const f = <FilterValueWithOptions>filter
      const option = f.options.find((opt) => opt.value === activeCaseLoadId)

      if (option) {
        logger.info(`PERSONALISATION DEBUG: (${index}): Autocomplete option found:`)
        logger.info(`PERSONALISATION DEBUG: (${index}): option: ${option}`)
        f.value = option.text
        f.staticOptionNameValue = option.value

        logger.info(`PERSONALISATION DEBUG: (${index}): Updated filter:`)
        logger.info(`PERSONALISATION DEBUG: (${index}): updated filter: ${f}`)
      }
    }
  })

  return filters
}

/**
 * Createa a query string from the saved defaults
 *
 * @param {defaultFilterValue[]} defaults
 * @return {*}  {string}
 */
export const createQsFromSavedDefaults = (
  defaults: defaultFilterValue[],
  fieldDefinitions: components['schemas']['FieldDefinition'][],
): string => {
  const fieldMap = new Map(fieldDefinitions.map((f) => [f.name, f]))

  return defaults
    .flatMap(({ name, value }): Array<[string, string]> => {
      const keyBase = `filters.${name}`
      const fieldDef = fieldMap.get(name)

      // --------------------------------------------
      // STRING
      // --------------------------------------------
      if (typeof value === 'string') {
        const isMultiSelect = fieldDef?.filter?.type === 'multiselect'
        if (isMultiSelect) {
          return value
            .split(',')
            .map((v) => v.trim())
            .filter(Boolean)
            .map((v) => [keyBase, v])
        }
        return [[keyBase, uiDateToApi(value) || value]]
      }

      // --------------------------------------------
      // GRANULAR DATERANGE
      // --------------------------------------------
      if ('granularity' in value) {
        return [
          [`${keyBase}.start`, uiDateToApi(value.start) || ''],
          [`${keyBase}.end`, uiDateToApi(value.end) || ''],
          [`${keyBase}.granularity`, String(value.granularity)],
          [`${keyBase}.quickFilter`, String(value.quickFilter)],
        ]
      }

      // --------------------------------------------
      // DATE RANGE
      // --------------------------------------------
      const pairs: Array<[string, string]> = [
        [`${keyBase}.start`, uiDateToApi(value.start) || ''],
        [`${keyBase}.end`, uiDateToApi(value.end) || ''],
      ]

      if (value.relative !== undefined) {
        pairs.push([`${keyBase}.relative-duration`, value.relative])
      }

      return pairs
    })
    .reduce((params, [key, value]) => {
      params.append(key, value)
      return params
    }, new URLSearchParams())
    .toString()
}

export default { saveDefaults, removeDefaults, setUserContextDefaults }
