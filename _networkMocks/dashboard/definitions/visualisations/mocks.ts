import { lineTimeseriesMocks } from './line-timeseries/mocks'
import { matrixMocks } from './matrix/mocks'
import { scorecardMocks } from './scorecard/mocks'
import { scorecardGroupMocks } from './scorecard-group/mocks'
import { listMocks } from './list/mocks'
import { barMocks } from './bar/mocks'
import { boxPlotMocks } from './boxplot/mocks'
import { lineMocks } from './line/mocks'
import { doughnutMocks } from './doughnut/mocks'
import { mixedMocks } from './mixed/mocks'

export const mockDefinitions = {
  lineTimeseries: {
    ...lineTimeseriesMocks,
  },
  matrix: {
    ...matrixMocks,
  },
  scorecard: {
    ...scorecardMocks,
  },
  scorecardGroup: {
    ...scorecardGroupMocks,
  },
  list: {
    ...listMocks,
  },
  bar: {
    ...barMocks,
  },
  boxPlot: {
    ...boxPlotMocks,
  },
  line: {
    ...lineMocks,
  },
  doughnut: {
    ...doughnutMocks,
  },
  mixed: {
    ...mixedMocks,
  },
}

export const mocks = [
  ...Object.values(lineTimeseriesMocks),
  ...Object.values(matrixMocks),
  ...Object.values(scorecardMocks),
  ...Object.values(scorecardGroupMocks),
  ...Object.values(listMocks),
  ...Object.values(barMocks),
  ...Object.values(boxPlotMocks),
  ...Object.values(lineMocks),
  ...Object.values(doughnutMocks),
  ...Object.values(mixedMocks),
]
