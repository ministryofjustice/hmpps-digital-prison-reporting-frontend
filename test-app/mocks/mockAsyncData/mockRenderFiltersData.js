const mockRenderFiltersData = {
  reportData: {
    reportName: 'name',
    variantName: 'Sort',
    description: 'descriptionFromReport',
    reportId: 'reportId',
    variantId: 'variantId',
    definitionPath: 'token',
    csrfToken: 'csrfToken',
    template: 'list',
    type: 'report',
  },
  filters: [
    {
      text: 'Field 2',
      name: 'field2',
      type: 'Select',
      options: [
        {
          disabled: true,
          selected: true,
          text: 'Select your option',
          value: 'no-filter',
        },
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
      dynamicResourceEndpoint: null,
      mandatory: true,
    },
    {
      text: 'Field 3',
      name: 'field3',
      type: 'daterange',
      value: {
        start: '2003-02-01',
        end: '2006-05-04',
      },
      minimumLength: null,
      dynamicResourceEndpoint: null,
      relativeOptions: [],
      mandatory: true,
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
      mandatory: false,
    },
    {
      text: 'Field 6',
      name: 'field6',
      type: 'text',
      value: null,
      minimumLength: null,
      dynamicResourceEndpoint: null,
    },
  ],
  sortBy: [
    {
      text: 'Column',
      name: 'sortColumn',
      type: 'Radio',
      options: [
        {
          value: 'field1',
          text: 'Field 1',
        },
        {
          value: 'field5',
          text: 'Field 5',
        },
        {
          value: 'field7',
          text: 'Field 7',
        },
      ],
      value: 'field5',
      minimumLength: null,
      mandatory: true,
    },
    {
      text: 'Direction',
      name: 'sortedAsc',
      type: 'Radio',
      options: [
        {
          value: 'true',
          text: 'Ascending',
        },
        {
          value: 'false',
          text: 'Descending',
        },
      ],
      value: 'true',
      minimumLength: null,
      mandatory: true,
    },
  ],
}

module.exports = mockRenderFiltersData
