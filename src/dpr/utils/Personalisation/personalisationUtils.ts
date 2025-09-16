import { Request, Response } from 'express'
import { Services } from '../../types/Services'
import localsHelper from '../localsHelper'
import { ReportType } from '../../types/UserReports'
import { components } from '../../types/api'
import { FilterType } from '../../components/_filters/filter-input/enum'
import DateRangeInputUtils from '../../components/_inputs/date-range/utils'
import GranularDateRangeInputUtils from '../../components/_inputs/granular-date-range/utils'
import MultiSelectUtils from '../../components/_inputs/multi-select/utils'
import DateInputUtils from '../../components/_inputs/date-input/utils'
import { RenderFiltersReturnValue } from '../../components/_async/async-filters-form/types'
import {
  DateFilterValue,
  DateRangeFilterValue,
  FilterValue,
  FilterValueWithOptions,
  GranularDateRangeFilterValue,
  MultiselectFilterValue,
} from '../../components/_filters/types'
import { defaultFilterValue } from './types'
import { FiltersType } from '../../components/_filters/filtersTypeEnum'

const saveDefaults = async (type: FiltersType, res: Response, req: Request, services: Services) => {
  const defaultValuesForReport = await getDefaultValues(req, res, services, type)
  const { dprUser } = localsHelper.getValues(res)
  const { reportId, id } = req.body
  return services.defaultFilterValuesService.save(dprUser.id, reportId, id, defaultValuesForReport)
}

const removeDefaults = async (type: FiltersType, res: Response, req: Request, services: Services) => {
  const { dprUser } = localsHelper.getValues(res)
  const { reportId, id } = req.params
  return services.defaultFilterValuesService.delete(dprUser.id, reportId, id, type)
}

const getDefaultValues = async (
  req: Request,
  res: Response,
  services: Services,
  filtersType: FiltersType,
): Promise<defaultFilterValue[]> => {
  const { token, definitionsPath } = localsHelper.getValues(res)
  const { reportId, id, type } = req.body

  const service = type === ReportType.REPORT ? services.reportingService : services.dashboardService
  const definition = await service.getDefinition(token, reportId, id, definitionsPath)
  const fields: components['schemas']['FieldDefinition'][] =
    type === ReportType.REPORT ? definition.variant.specification.fields : definition.filterFields

  const bodyFilterValues = Object.keys(req.body)
    .filter((k) => {
      return k.includes('filters.') || k.includes('sortColumn') || k.includes('sortedAsc')
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
            value = k.value.join(',')
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

  return defaultValuesConfig.filter((defaultValue) => {
    return defaultValue ? defaultValue.value !== '' : false
  })
}

const setFilterValuesFromSavedDefaults = (
  filters: FilterValue[],
  sortBy: FilterValue[],
  defaultValues: defaultFilterValue[],
): RenderFiltersReturnValue => {
  const hasDefaults = filters.some((f) => {
    const defaultValue = defaultValues.findIndex((v) => v.name === f.name)
    return defaultValue !== -1
  })

  const filterValues = filters.map((filter) => {
    const defaultValue = defaultValues.find((v) => v.name === filter.name)
    let updatedFilter = {
      ...filter,
    }
    const type = filter.type.toLocaleLowerCase()

    switch (type) {
      case FilterType.multiselect.toLocaleLowerCase():
        updatedFilter = MultiSelectUtils.setFilterValuesFromSavedDefault(
          <MultiselectFilterValue>updatedFilter,
          hasDefaults,
          defaultValue,
        )
        break
      case FilterType.date.toLocaleLowerCase():
        if (hasDefaults) {
          updatedFilter.value = ''
        }
        if (defaultValue) {
          updatedFilter = <DateFilterValue>DateInputUtils.setFilterValueFromDefault(defaultValue, updatedFilter)
        }
        break
      case FilterType.dateRange.toLocaleLowerCase():
        if (hasDefaults) {
          updatedFilter.value = { start: '', end: '', relative: undefined }
        }
        if (defaultValue) {
          updatedFilter = <DateRangeFilterValue>(
            DateRangeInputUtils.setFilterValueFromDefault(defaultValue, updatedFilter)
          )
        }
        break
      case FilterType.granularDateRange.toLocaleLowerCase():
        if (hasDefaults) {
          updatedFilter.value = { start: '', end: '', granularity: undefined, quickFilter: undefined }
        }
        if (defaultValue) {
          updatedFilter = <GranularDateRangeFilterValue>(
            GranularDateRangeInputUtils.setFilterValueFromDefault(defaultValue, updatedFilter)
          )
        }
        break
      default:
        {
          let value = hasDefaults ? '' : updatedFilter.value
          value = defaultValue ? defaultValue.value : value
          updatedFilter = {
            ...filter,
            value,
          }
        }

        break
    }

    return updatedFilter
  })

  const sortValues = sortBy.map((sortFilter) => {
    const defaultValue = defaultValues.find((v) => v.name === sortFilter.name)
    return {
      ...sortFilter,
      ...(defaultValue && { value: defaultValue.value }),
    }
  })

  return {
    filters: filterValues,
    sortBy: sortValues,
  }
}

const setUserContextDefaults = (res: Response, filters: FilterValue[]) => {
  const { dprUser } = localsHelper.getValues(res)
  const { activeCaseLoadId } = dprUser

  filters.forEach((filter) => {
    if (
      filter.type.toLocaleLowerCase() === FilterType.autocomplete.toLocaleLowerCase() &&
      filter.text.toLocaleLowerCase().includes('establishment') &&
      activeCaseLoadId.length
    ) {
      const f = <FilterValueWithOptions>filter
      const option = f.options.find((opt) => opt.value === activeCaseLoadId)

      if (option) {
        f.value = option.text
        f.staticOptionNameValue = activeCaseLoadId
      }
    }
  })

  return filters
}

export default { saveDefaults, removeDefaults, setFilterValuesFromSavedDefaults, setUserContextDefaults }
