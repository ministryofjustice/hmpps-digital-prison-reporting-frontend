import { z } from 'zod'
import VisualisatonSchemas from '../../../../../components/_dashboards/dashboard-visualisation/Validate'

const DashboardSectionSchema = z.object({
  id: z.string(),
  display: z.string(),
  description: z.string().optional(),
  visualisations: z.array(VisualisatonSchemas.DashboardVisualisationSchema),
})

const DashboardSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  sections: z.array(DashboardSectionSchema, {
    error: (issue) =>
      issue.input === undefined
        ? 'Dashboard definition: Sections is required'
        : 'Dashboard definition: Sections must be an array',
  }),
  filterFields: z.array(z.any()).optional(), // TODO
})

export default { DashboardSchema, DashboardSectionSchema }
