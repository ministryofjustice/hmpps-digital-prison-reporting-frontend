export const completeBadDataSet = [
  [
    {
      ts: { raw: 'Jan 25' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: undefined,
      },
      metric_one_is_missing: {
        raw: 614,
      },
      has_metric_two: {
        // no raw
      },
      metric_two_is_missing: {
        raw: 665,
      },
      has_metric_three: {
        // String instead of number
        raw: '680',
      },
      metric_three_is_missing: {
        raw: 799,
      },
      html_link: {
        raw: '<a href="#">Some link</a>',
      },
    },
  ],
]
