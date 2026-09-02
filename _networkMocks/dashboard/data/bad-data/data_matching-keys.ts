export const completeBadDataSetDuplicateKeyValues = [
  [
    {
      ts: { raw: 'Jan 25' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 533,
      },
      metric_one_is_missing: {
        raw: 614,
      },
      has_metric_two: {
        raw: 684,
      },
      metric_two_is_missing: {
        raw: 665,
      },
      has_metric_three: {
        raw: 680,
      },
      metric_three_is_missing: {
        raw: 799,
      },
      html_link: {
        raw: '<a href="#">Some link</a>',
      },
    },
    {
      ts: { raw: 'Jan 25' },
      establishment_id: {
        raw: 'ABC',
      },
      has_metric_one: {
        raw: 534,
      },
      metric_one_is_missing: {
        raw: 615,
      },
      has_metric_two: {
        raw: 685,
      },
      metric_two_is_missing: {
        raw: 66,
      },
      has_metric_three: {
        raw: 681,
      },
      metric_three_is_missing: {
        raw: 780,
      },
      html_link: {
        raw: '<a href="#">Some link other</a>',
      },
    },
  ],
]
