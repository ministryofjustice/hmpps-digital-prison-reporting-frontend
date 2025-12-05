import { z } from 'zod'
import {
  DashboardVisualisationSchema,
  DashboardColumns,
  DashboardVisualisationMeasureSchema,
} from '../dashboard-visualisation/Validate'

const ListOptions = z.object({
  showLatest: z.boolean().default(true),
  columnsAsList: z.boolean().optional(),
})

const ListSchema = z.object({
  ...DashboardVisualisationSchema.shape,
  type: z.literal('list'),
  options: z.object(ListOptions.shape),
  columns: z.object({
    ...DashboardColumns.shape,
    measures: z.array(DashboardVisualisationMeasureSchema).min(1, 'Measure must contain a single item'),
  }),
})

const ListSchemas = {
  ListSchema,
  ListOptions,
}

export default ListSchemas
