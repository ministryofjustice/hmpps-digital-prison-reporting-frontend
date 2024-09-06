import { components } from '../../types/api'
import CollatedSummaryBuilder from './CollatedSummaryBuilder'
import { AsyncSummary } from '../../types/AsyncReport'

const activityField: components['schemas']['FieldDefinition'] = {
  name: 'activity',
  display: 'Activity',
  sortable: true,
  defaultsort: false,
  type: 'string',
  mandatory: false,
  visible: true,
  calculated: false,
}
const firstNameField: components['schemas']['FieldDefinition'] = {
  ...activityField,
  name: 'firstName',
  display: 'First name',
}
const surNameField: components['schemas']['FieldDefinition'] = {
  ...activityField,
  name: 'surName',
  display: 'Surname',
}
const defaultFields = [activityField, firstNameField, surNameField]
const defaultSpec: components['schemas']['Specification'] = {
  fields: defaultFields,
  template: 'list',
  sections: ['firstName', 'surName'],
}
const defaultData = [
  {
    firstName: 'Bob',
    surName: 'Robertson',
    activity: 'Painting',
  },
  {
    firstName: 'Jim',
    surName: 'Jameson',
    activity: 'Painting',
  },
  {
    firstName: 'Bob',
    surName: 'Robertson',
    activity: 'Cleaning',
  },
  {
    firstName: 'Jim',
    surName: 'Jameson',
    activity: 'Cooking',
  },
]

const expectedAllActivitiesDataTable = {
  colCount: 1,
  head: [
    {
      text: 'Activity',
    },
  ],
  rowCount: 4,
  rows: [
    [
      {
        classes: '',
        format: 'string',
        text: 'Painting',
      },
    ],
    [
      {
        classes: '',
        format: 'string',
        text: 'Painting',
      },
    ],
    [
      {
        classes: '',
        format: 'string',
        text: 'Cleaning',
      },
    ],
    [
      {
        classes: '',
        format: 'string',
        text: 'Cooking',
      },
    ],
  ],
}

describe('collate', () => {
  it('Summaries with the same template are grouped together', () => {
    const pageHeaderSummary1: AsyncSummary = {
      id: 'one',
      template: 'page-header',
      fields: defaultFields,
      data: defaultData,
    }
    const pageHeaderSummary2: AsyncSummary = {
      id: 'two',
      template: 'page-header',
      fields: defaultFields,
      data: defaultData,
    }
    const pageFooterSummary: AsyncSummary = {
      id: 'three',
      template: 'page-footer',
      fields: defaultFields,
      data: defaultData,
    }

    const summaries: Array<AsyncSummary> = [pageHeaderSummary1, pageHeaderSummary2, pageFooterSummary]

    const collated = new CollatedSummaryBuilder(defaultSpec, summaries).collate()

    expect(collated).toEqual({
      'page-header': [pageHeaderSummary1, pageHeaderSummary2],
      'page-footer': [pageFooterSummary],
    })
  })
})

describe('collateAndMapToDataTable', () => {
  it('Summaries with the same template are grouped together', () => {
    const pageHeaderSummary1: AsyncSummary = {
      id: 'one',
      template: 'page-header',
      fields: defaultFields,
      data: defaultData,
    }
    const pageHeaderSummary2: AsyncSummary = {
      id: 'two',
      template: 'page-header',
      fields: defaultFields,
      data: defaultData,
    }
    const pageFooterSummary: AsyncSummary = {
      id: 'three',
      template: 'page-footer',
      fields: defaultFields,
      data: defaultData,
    }

    const summaries: Array<AsyncSummary> = [pageHeaderSummary1, pageHeaderSummary2, pageFooterSummary]

    const collated = new CollatedSummaryBuilder(defaultSpec, summaries).collateAndMapToDataTable()

    expect(collated).toEqual({
      'page-footer': [expectedAllActivitiesDataTable],
      'page-header': [expectedAllActivitiesDataTable, expectedAllActivitiesDataTable],
    })
  })
})

describe('collateSectioned', () => {
  it('Summaries with the same template are grouped together', () => {
    const sectionHeaderSummary1: AsyncSummary = {
      id: 'one',
      template: 'section-header',
      fields: defaultFields,
      data: defaultData,
    }
    const sectionHeaderSummary2: AsyncSummary = {
      id: 'two',
      template: 'section-header',
      fields: defaultFields,
      data: defaultData,
    }
    const pageFooterSummary: AsyncSummary = {
      id: 'three',
      template: 'page-footer',
      fields: defaultFields,
      data: defaultData,
    }

    const summaries: Array<AsyncSummary> = [sectionHeaderSummary1, sectionHeaderSummary2, pageFooterSummary]

    const collated = new CollatedSummaryBuilder(defaultSpec, summaries).collateSectionedAndMapToDataTable()

    const expectedBobActivities = {
      colCount: 1,
      head: [
        {
          text: 'Activity',
        },
      ],
      rowCount: 2,
      rows: [
        [
          {
            classes: '',
            format: 'string',
            text: 'Painting',
          },
        ],
        [
          {
            classes: '',
            format: 'string',
            text: 'Cleaning',
          },
        ],
      ],
    }

    const expectedJimActivities = {
      colCount: 1,
      head: [
        {
          text: 'Activity',
        },
      ],
      rowCount: 2,
      rows: [
        [
          {
            classes: '',
            format: 'string',
            text: 'Painting',
          },
        ],
        [
          {
            classes: '',
            format: 'string',
            text: 'Cooking',
          },
        ],
      ],
    }

    expect(collated).toEqual({
      'First name: Bob, Surname: Robertson': [expectedBobActivities, expectedBobActivities],
      'First name: Jim, Surname: Jameson': [expectedJimActivities, expectedJimActivities],
      'page-footer': [expectedAllActivitiesDataTable],
    })
  })
})
