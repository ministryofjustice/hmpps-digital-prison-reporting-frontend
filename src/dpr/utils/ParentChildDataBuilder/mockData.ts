import { ParentChildTemplateData } from './types'

export const mockData: ParentChildTemplateData = {
  parentHead: [
    {
      fieldName: 'parent1',
      text: 'Name',
    },
  ],
  childHead: [],
  sections: [
    {
      data: [
        {
          parent: {
            rows: [
              [
                {
                  fieldName: 'parent1',
                  text: 'Parent 1',
                },
                {
                  fieldName: 'parent2',
                  text: 'Parent 2',
                },
              ],
            ],
          },
          child: {
            title: 'Child report 1',
            rows: [
              [
                {
                  fieldName: 'child1',
                  text: 'Child 1.0',
                },
                {
                  fieldName: 'child2',
                  text: 'Child 1.1',
                },
              ],
              [
                {
                  fieldName: 'child1',
                  text: 'Child 2.0',
                },
                {
                  fieldName: 'child2',
                  text: 'Child 2.1',
                },
              ],
            ],
          },
        },
        {
          parent: {
            rows: [
              [
                {
                  fieldName: 'parent1',
                  text: 'Parent 1',
                },
                {
                  fieldName: 'parent2',
                  text: 'Parent 2',
                },
              ],
            ],
          },
          child: {
            title: 'Child report 1',
            rows: [
              [
                {
                  fieldName: 'child1',
                  text: 'Child 1.0',
                },
                {
                  fieldName: 'child2',
                  text: 'Child 1.1',
                },
              ],
              [
                {
                  fieldName: 'child1',
                  text: 'Child 2.0',
                },
                {
                  fieldName: 'child2',
                  text: 'Child 2.1',
                },
              ],
            ],
          },
        },
      ],
    },
  ],
}
