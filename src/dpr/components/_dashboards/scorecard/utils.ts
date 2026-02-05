import { DashboardVisualisation, DashboardVisualisationType } from '../dashboard-visualisation/types'
import { Scorecard } from './types'

export const mergeScorecardsIntoGroup = (visualisations: DashboardVisualisation[], isEnabled: boolean) => {
  const groupedScorecardIndexes: number[][] = visualisations
    // get scorecard indexes
    .reduce((acc: number[], vis: DashboardVisualisation, i: number) => {
      if (vis.type === DashboardVisualisationType.SCORECARD) acc.push(i)
      return acc
    }, [])
    // group adjacent indexes
    .reduce((r: number[][], n) => {
      const lastSubArray = r[r.length - 1]
      if (!lastSubArray || lastSubArray[lastSubArray.length - 1] !== n - 1) r.push([])
      r[r.length - 1].push(n)
      return r
    }, [])

  groupedScorecardIndexes.reverse().forEach((group: number[]) => {
    const spliceAtIndex = group[0]
    const scorecardGroup: Scorecard[] = group
      .map((scIndex: number) => {
        return visualisations[scIndex].data as Scorecard
      })
      .filter((scorecard: Scorecard) => !!scorecard)

    while (group.length) {
      const i = group.pop()
      if (i !== undefined) visualisations.splice(i, 1)
    }

    if (scorecardGroup.length) {
      visualisations.splice(spliceAtIndex, 0, {
        id: `${spliceAtIndex}`,
        type: DashboardVisualisationType.SCORECARD_GROUP,
        data: [{ scorecards: scorecardGroup }],
        isEnabled,
      })
    }
  })

  return visualisations
}

export default {
  mergeScorecardsIntoGroup,
}
