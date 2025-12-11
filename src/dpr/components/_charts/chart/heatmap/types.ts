import z from 'zod'
import MatrixTimeseriesSchema from './validate'

export interface MatrixChartData {
  x: number | string
  y: number | string
  r?: number | undefined
  v: number
}

export type MatrixTimeseriesDefinitionType = z.infer<typeof MatrixTimeseriesSchema>
