import { z } from 'zod'
import { DashboardVisualisationSchema, DashboardColumns } from '../dashboard-visualisation/Validate'

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
  }),
})

const ListSchemas = {
  ListSchema,
  ListOptions,
}

export default ListSchemas
