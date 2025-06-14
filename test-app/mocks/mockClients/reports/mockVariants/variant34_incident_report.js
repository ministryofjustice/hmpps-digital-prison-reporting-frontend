const variant34 = {
  id: 'variantId-34',
  name: 'Sectioned row - Incident report',
  description: 'An example of an incident report using a row section template',
  resourceName: 'reports/list',
  classification: 'OFFICIAL',
  printable: true,
  specification: {
    template: 'row-section-child',
    sectionedFields: [
      {
        name: 'section1',
        fields: ['type', 'date', 'reportedBy', 'status', 'description'],
      },
      {
        name: 'section2',
        child: 'variantId-34-prisoners-involved',
      },
      {
        name: 'section3',
        child: 'variantId-34-staff-involved',
      },
      {
        name: 'section4',
        child: 'variantId-34-incident-details',
      },
    ],
    fields: [
      {
        name: 'type',
        display: 'Type',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'date',
        display: 'Date and time of incident',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'status',
        display: 'Status',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'reportedBy',
        display: 'Reported by',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'description',
        display: 'Description',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: true,
      },
      {
        name: 'joinField',
        display: 'Join Field',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section1',
        display: 'Incident Summary',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section2',
        display: 'Prisoners involved',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section3',
        display: 'Staff involved',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
      {
        name: 'section4',
        display: 'About the incident',
        sortable: false,
        defaultsort: false,
        type: 'string',
        mandatory: false,
        visible: false,
      },
    ],
  },
  childVariants: [
    {
      id: 'variantId-34-prisoners-involved',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['incidentId'],
      specification: {
        template: 'row-section-child',
        fields: [
          {
            name: 'prisonerName',
            display: 'Child field 1',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'prisonerDetails',
            display: 'Child field 2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'incidentId',
            display: 'Join Field',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
        ],
      },
    },
    {
      id: 'variantId-34-staff-involved',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['incidentId'],
      specification: {
        template: 'row-section-child',
        fields: [
          {
            name: 'staffName',
            display: 'Child field 1',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'staffDetails',
            display: 'Child field 2',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'incidentId',
            display: 'Join Field',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
        ],
      },
    },
    {
      id: 'variantId-34-incident-details',
      name: 'Child Report',
      resourceName: 'reports/list',
      joinFields: ['incidentId'],
      specification: {
        template: 'row-section-child',
        fields: [
          {
            name: 'incidentQuestion',
            display: 'Incident Question',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'incidentResponse',
            display: 'Incident Response',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: true,
          },
          {
            name: 'incidentId',
            display: 'Join Field',
            sortable: false,
            defaultsort: false,
            type: 'string',
            mandatory: false,
            visible: false,
          },
        ],
      },
    },
  ],
}

module.exports = variant34
