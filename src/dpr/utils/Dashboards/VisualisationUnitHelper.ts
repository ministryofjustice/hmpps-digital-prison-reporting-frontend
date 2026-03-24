import { UnitType } from '../../components/_dashboards/dashboard-visualisation/Validate'

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

export const setUnitOnValue = (
  value: string | number | null | undefined,
  unit?: string,
  brackets: boolean = true,
  prefix: boolean = false,
): string => {
  if (unit) {
    const unitValue = brackets ? ` (${unit})` : unit
    return !prefix ? `${value}${unitValue}` : `${unitValue}${value}`
  }
  return `${value}`
}
