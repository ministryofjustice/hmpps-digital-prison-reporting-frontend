import { components } from '../../types/api'
import { DashboardDataResponse } from '../../types/Metrics'

/**
 * Returns whether the keys array contains optional ones
 *
 * @param {components['schemas']['DashboardVisualisationColumnDefinition'][]} keys
 * @return {*}  {boolean}
 */
export const hasOptionalKeys = (keys: components['schemas']['DashboardVisualisationColumnDefinition'][]): boolean => {
  return keys?.some((key) => key.optional)
}

/**
 * Filters dashboard data rows based on the most complete valid set of column IDs.
 *
 * Workflow:
 * 1. Generate all fallback key combinations using getKeyVariations().
 * 2. Use getKeyIds() to determine the "best" set of required keys — meaning:
 *    the largest set of IDs for which *at least one* row has valid data
 *    (non-empty, non-null, non-undefined).
 * 3. Filter the entire dataset to keep only rows that have valid values
 *    for all selected required keys.
 *
 * @param {DashboardDataResponse[]} dashboardData The full dataset to filter.
 * @param {components['schemas']['DashboardVisualisationColumnDefinition'][]} keys Column definitions used to derive key combinations.
 * @returns {DashboardDataResponse[]} Rows that satisfy the selected required-key validity rules.
 */
export const filterRowsByKeys = (
  dashboardData: DashboardDataResponse[],
  keys: components['schemas']['DashboardVisualisationColumnDefinition'][],
): DashboardDataResponse[] => {
  // 1. Build fallback key variations
  const colIdVariations: string[][] = getKeyVariations(keys)
  // 2. Select the most complete variation supported by at least one valid row
  const validHeadIds: string[] = getKeyIds(dashboardData, colIdVariations)

  /**
   * Checks whether a single row contains valid values for all required keys.
   */
  const isRowValid = (row: DashboardDataResponse): boolean =>
    Object.keys(row)
      .map((fieldId) => {
        const value = row[fieldId].raw

        // Only validate fields that are part of the selected key set
        return validHeadIds.includes(fieldId) ? value !== '' && value !== null && value !== undefined : true
      })
      .every(Boolean)

  // 3. Keep only fully-valid rows
  return dashboardData.filter(isRowValid)
}

/**
 * Generate all valid column ID variations based on trailing optional keys.
 *
 * Behaviour rules:
 * 1. Begin with the full list of column IDs.
 * 2. Iterate backward through the keys:
 *    - Add the current remaining IDs as a variation.
 *    - If the current key is optional, remove its ID from the end.
 *    - If the current key is NOT optional, stop removing afterward.
 * 3. If *all* keys are optional, append an empty list.
 *
 * @param {components['schemas']['DashboardVisualisationColumnDefinition'][]} keys The visualisation column definitions.
 * @returns {string[][]} An array of ID combinations representing valid fallback sets.
 */
export const getKeyVariations = (
  keys: components['schemas']['DashboardVisualisationColumnDefinition'][],
): string[][] => {
  const colIds: string[] = keys.map((k) => k.id)
  const allOptional: boolean = keys.every((k) => k.optional)
  const reversedKeys: components['schemas']['DashboardVisualisationColumnDefinition'][] = keys.slice().reverse()

  interface ReducerState {
    remaining: string[]
    variations: string[][]
  }

  /**
   * Reduce through reversed keys, accumulating variations and trimming
   * optional keys from the end.
   */
  const state: ReducerState = reversedKeys.reduce<ReducerState>(
    (acc: ReducerState, key: components['schemas']['DashboardVisualisationColumnDefinition']) => {
      // Add the current remaining IDs as a variation.
      acc.variations.push([...acc.remaining])
      // Drop last ID if the key was optional.
      acc.remaining = key.optional ? acc.remaining.slice(0, -1) : acc.remaining
      return acc
    },
    {
      remaining: [...colIds],
      variations: [],
    },
  )

  // Append empty variation only when all keys are optional
  if (allOptional) {
    state.variations.push([])
  }

  return state.variations
}

/**
 * Given dashboard data and a list of column-ID variations (from getKeyVariations),
 * this function returns the *first* ID set for which there exists at least one
 * row where all referenced fields contain valid (non-empty, non-null) raw values.
 *
 * If *none* of the variations produce any valid rows, the function returns the
 * *last* variation tested.
 *
 * @param {DashboardDataResponse[]} dashboardData Array of dataset rows to validate.
 * @param {string[][]} colIdVariations Variations of column IDs, ordered from most strict → least strict.
 * @returns {string[]} The first ID set that has at least one fully-valid row, or the last set.
 */
export const getKeyIds = (dashboardData: DashboardDataResponse[], colIdVariations: string[][]): string[] => {
  // Precompute field lists for each row (performance optimisation)
  const rowFieldLists: string[][] = dashboardData.map((row) => Object.keys(row))

  /**
   * Check whether a row satisfies all required IDs.
   */
  const isRowValid = (row: DashboardDataResponse, rowFields: string[], ids: string[]): boolean =>
    ids.every((id) => {
      if (!rowFields.includes(id)) return false
      const value = row[id].raw
      return value !== '' && value !== null && value !== undefined
    })

  /**
   * Find the first variation with at least one valid row.
   */
  const match = colIdVariations.find((ids) =>
    dashboardData.some((row, index) => isRowValid(row, rowFieldLists[index], ids)),
  )

  // If none match, return the final variation.
  return match ?? colIdVariations[colIdVariations.length - 1]
}
