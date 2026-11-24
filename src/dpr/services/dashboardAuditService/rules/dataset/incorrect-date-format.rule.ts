import { DashboardVisualisationType } from 'src/dpr/components/_dashboards/dashboard-visualisation/types'
import { DashboardAuditSeverity, VisualAuditContext, VisualAuditSuggestion } from '../../types'
import { getTimestampMeasure } from '../../../../utils/Dashboards/VisualisationDatasetHelper'
import { DatasetRule } from './types'

export const incorrectDateFormatRule: DatasetRule = {
  supportedTypes: [] as DashboardVisualisationType[],

  audit(context: VisualAuditContext): VisualAuditSuggestion[] {
    const auditSuggestions = []

    const dateFieldId = getTimestampMeasure(context.definition.columns.measures)?.id

    if (dateFieldId) {
      const dateValue = context.dataset[0][dateFieldId]?.raw

      if (dateValue) {
        const DATE_REGEX = /^\d{4}(?:-(?:0[1-9]|1[0-2])(?:-(?:0[1-9]|[12][0-9]|3[01]))?)?$/
        const isValidDate = (value: string): boolean => DATE_REGEX.test(value)

        if (!isValidDate(<string>dateValue)) {
          const description = `<p>Your dataset includes timestamp data in an incorrect format</p>
              <p>Please use the following formats when writing timestamp data</p>
                <p><strong>"YYYY-MM-DD"</strong> for daily data</br>
                  <strong>"YYYY-MM"</strong> for monthly data</br>
                  <strong>"YYYY"</strong> for yearly data</p>
              <p>Using the correct date formats will ensure that chart and table data render correctly and in the correct order.</p>`

          auditSuggestions.push({
            code: 'INCORRECT_DATE_FORMAT',
            severity: DashboardAuditSeverity.ERROR,
            title: 'Incorrect date format in dataset',
            description,
            visualId: context.id,
            visualTitle: context.name,
            visualAuditKey: context.auditKey,
          })
        }
      }
    }

    return auditSuggestions
  },
}
