import { components } from './api'

// TEMPORARY EXTENDED TYPE
// TODO: Remove these and replace all references with `VariantDefinitionSummary` when API is up to date
export type VariantDefinitionSummaryWithSchedule = components['schemas']['VariantDefinitionSummary'] & {
  schedule?: string | undefined
}

// TEMPORARY EXTENDED TYPE
// TODO: Remove these and replace all references with `VariantDefinitionSummary` when API is up to date
export type VariantDefinitionWithSchedule = components['schemas']['VariantDefinition'] & {
  schedule?: string | undefined
}
