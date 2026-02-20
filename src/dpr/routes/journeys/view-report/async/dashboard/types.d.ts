import z from 'zod'
import DashboardSchemas from './validate'

export type ValidatedDashboardDefinition = z.infer<typeof DashboardSchemas.DashboardSchema>
export type ValidatedDashboardSectionDefinition = z.infer<typeof DashboardSchemas.DashboardSectionSchema>
