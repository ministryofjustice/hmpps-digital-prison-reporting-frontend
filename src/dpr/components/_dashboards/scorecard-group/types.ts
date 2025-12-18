import z from 'zod'
import ScorecardSchema from './validate'

export type ScorecardGroupDefinitionType = z.infer<typeof ScorecardSchema.ScorecardGroupSchema>
export type ScorecardGroupDefinitionMeasure = z.infer<typeof ScorecardSchema.ScorecardGroupColumn>
