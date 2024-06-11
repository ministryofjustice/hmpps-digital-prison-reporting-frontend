const mockFilterData = [
  {
    text: 'Field 1',
    name: 'field1',
    type: 'Radio',
    options: [
      {
        value: 'value1.1',
        text: 'Value 1.1',
      },
      {
        value: 'value1.2',
        text: 'Value 1.2',
      },
      {
        value: 'value1.3',
        text: 'Value 1.3',
      },
    ],
    value: 'value1.2',
    minimumLength: null,
    dynamicResourceEndpoint: '/dynamic-values/field1?prefix={prefix}',
  },
  {
    text: 'Field 2',
    name: 'field2',
    type: 'Select',
    options: [
      {
        value: 'value2.1',
        text: 'Value 2.1',
      },
      {
        value: 'value2.2',
        text: 'Value 2.2',
      },
      {
        value: 'value2.3',
        text: 'Value 2.3',
      },
    ],
    value: null,
    minimumLength: null,
    dynamicResourceEndpoint: '/dynamic-values/field2?prefix={prefix}',
  },
  {
    text: 'Field 3',
    name: 'field3',
    type: 'daterange',
    options: null,
    value: {
      start: '2003-02-01',
      end: '2006-05-04',
    },
    minimumLength: null,
    dynamicResourceEndpoint: '/dynamic-values/field3?prefix={prefix}',
    min: '2003-02-01',
    max: '2007-05-04',
  },
  {
    text: 'Field 4',
    name: 'field4',
    type: 'autocomplete',
    options: [
      {
        value: 'Fezzick',
        text: 'Fezzick',
      },
      {
        value: 'Inigo Montoya',
        text: 'Inigo Montoya',
      },
      {
        value: 'Prince Humperdink',
        text: 'Prince Humperdink',
      },
      {
        value: 'Princess Buttercup',
        text: 'Princess Buttercup',
      },
      {
        value: 'Westley',
        text: 'Westley',
      },
    ],
    value: null,
    minimumLength: 3,
    dynamicResourceEndpoint: null,
  },
  {
    text: 'Field 5',
    name: 'field5',
    type: 'autocomplete',
    options: null,
    value: null,
    minimumLength: 3,
    dynamicResourceEndpoint: '/dynamic-values/field5?prefix={prefix}',
  },
]

module.exports = mockFilterData
