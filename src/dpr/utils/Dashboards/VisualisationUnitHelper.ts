import { ChartMeasure } from '../../components/_dashboards/dashboard-visualisation/types'
import { UnitType } from '../../components/_dashboards/dashboard-visualisation/Validate'

/**
 * Gets the unit type & symbol from the measures
 *
 * @param {ChartMeasure[]} measures
 * @return {*}  {({ unit: string; symbol?: string } | undefined)}
 */
export const getUnitFromMeasures = (measures: ChartMeasure[]): { unit: string; symbol?: string } | undefined => {
  const unit = measures.find((m) => m.unit)?.unit

  if (!unit) return unit

  return {
    unit,
    ...(unit && { symbol: mapUnitToSymbol(unit) }),
  }
}

/**
 * Maps the measure Unit type to the correct char
 *
 * @param {string} unit
 * @return {*}  {string}
 */
export const mapUnitToSymbol = (unit?: UnitType): string => {
  switch (unit) {
    case 'PERCENTAGE':
      return '%'
    default:
      return ''
  }
}
