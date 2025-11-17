import { RequestHandler } from 'express'

export default class GranularDateRangeController {
  GET: RequestHandler = async (_req, res) => {
    res.render('views/pages/components/filters/granular-date-range/view.njk', {
      title: 'Granular date range input',
      defaultInput: {
        text: 'Field 1',
        name: 'field1',
        type: 'granulardaterange',
        value: {
          start: '2025-01-31',
          end: '2025-07-30',
          granularity: { value: 'monthly', display: 'Monthly' },
          quickFilter: { value: 'last-six-months', display: 'Last 6 months' },
          partialDate: { start: true, end: true },
        },
        minimumLength: undefined,
        dynamicResourceEndpoint: undefined,
        mandatory: true,
        quickFilterOptions: [
          { value: 'none', text: 'None' },
          { value: 'today', text: 'Today' },
          { value: 'past', text: 'Past:', disabled: true },
          { value: 'yesterday', text: 'Yesterday' },
          { value: 'last-seven-days', text: 'Last 7 days' },
          { value: 'last-thirty-days', text: 'Last 30 days' },
          { value: 'last-month', text: 'Last month' },
          { value: 'last-full-month', text: 'Last full month' },
          { value: 'last-ninety-days', text: 'Last 90 days' },
          { value: 'last-three-months', text: 'Last 3 months' },
          { value: 'last-full-three-months', text: 'Last full 3 months' },
          { value: 'last-six-months', text: 'Last 6 months' },
          { value: 'last-full-six-months', text: 'Last full 6 months' },
          { value: 'last-year', text: 'Last year' },
          { value: 'last-full-year', text: 'Last full year' },
          { value: 'future', text: 'Future:', disabled: true },
          { value: 'tomorrow', text: 'Tomorrow' },
          { value: 'next-seven-days', text: 'Next 7 days' },
          { value: 'next-thirty-days', text: 'Next 30 days' },
          { value: 'next-month', text: 'Next month' },
          { value: 'next-full-month', text: 'Next full month' },
          { value: 'next-ninety-days', text: 'Next 90 days' },
          { value: 'next-three-months', text: 'Next 3 months' },
          { value: 'next-full-three-months', text: 'Next full 3 months' },
          { value: 'next-six-months', text: 'Next 6 months' },
          { value: 'next-full-six-months', text: 'Next full 6 months' },
          { value: 'next-year', text: 'Next year' },
          { value: 'next-full-year', text: 'Next full year' },
        ],
        granularityOptions: [
          { value: 'hourly', text: 'Hourly' },
          { value: 'daily', text: 'Daily' },
          { value: 'monthly', text: 'Monthly' },
          { value: 'annually', text: 'Annually' },
        ],
      },
    })
  }
}
