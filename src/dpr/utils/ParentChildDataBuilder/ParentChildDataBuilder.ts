import { Template } from '../../types/Templates'
import { components } from '../../types/api'
import { ChildData } from './types'

class ParentChildDataTableBuilder {
  variant: components['schemas']['VariantDefinition']

  childVariants: components['schemas']['ChildVariantDefinition'][] = []

  childData: Array<ChildData> = []

  template: Template

  constructor(variant: components['schemas']['VariantDefinition']) {
    const { specification } = variant
    const { template } = <components['schemas']['Specification']>specification

    this.template = template
    this.variant = variant
    this.childVariants = this.variant.childVariants || []
  }

  withChildData(childData: Array<ChildData>) {
    this.childData = childData
    return this
  }

  build() {
    return {
      parentHead: [],
      childHead: [],
      sections: [
        {
          title: '',
          count: 0,
          data: [
            {
              parent: {
                rows: [],
              },
              child: {
                title: '',
                rows: [],
              },
            },
          ],
        },
      ],
    }
  }
}

export { ParentChildDataTableBuilder }
export default ParentChildDataTableBuilder
